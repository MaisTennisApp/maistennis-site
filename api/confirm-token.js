// API Serverless do Vercel para validar tokens de confirmação de email
// Conecta com o Supabase para validar e marcar emails como confirmados

import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase (usar variáveis de ambiente no Vercel)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Service role key para bypass RLS

export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ 
      success: false, 
      message: 'Token não fornecido' 
    });
  }

  // Verificar se as variáveis de ambiente estão configuradas
  if (!supabaseUrl || !supabaseKey) {
    console.error('Variáveis de ambiente não configuradas');
    return res.status(500).json({ 
      success: false, 
      message: 'Erro de configuração do servidor' 
    });
  }

  try {
    // Criar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Buscar token no banco
    const { data: tokenData, error: tokenError } = await supabase
      .from('email_confirmations')
      .select('*')
      .eq('token', token)
      .single();

    if (tokenError || !tokenData) {
      return res.status(404).json({ 
        success: false, 
        message: 'Token inválido ou não encontrado' 
      });
    }

    // 2. Verificar se já foi confirmado
    if (tokenData.confirmed) {
      return res.status(400).json({ 
        success: false, 
        message: 'Este email já foi confirmado anteriormente' 
      });
    }

    // 3. Verificar se expirou
    const now = new Date();
    const expiresAt = new Date(tokenData.expires_at);
    if (now > expiresAt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token expirado. Solicite um novo email de confirmação' 
      });
    }

    // 4. Marcar como confirmado
    const { error: updateError } = await supabase
      .from('email_confirmations')
      .update({
        confirmed: true,
        confirmed_at: new Date().toISOString(),
      })
      .eq('token', token);

    if (updateError) {
      console.error('Erro ao atualizar token:', updateError);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro ao confirmar email' 
      });
    }

    // 5. Atualizar metadata do usuário no Supabase Auth
    try {
      const { error: authError } = await supabase.auth.admin.updateUserById(
        tokenData.user_id,
        {
          user_metadata: {
            email_confirmed: true,
          },
        }
      );

      if (authError) {
        console.error('Erro ao atualizar auth:', authError);
        // Não retornar erro, pois o token já foi confirmado
      }
    } catch (authError) {
      console.error('Erro ao atualizar auth:', authError);
      // Não retornar erro, pois o token já foi confirmado
    }

    // 6. Sucesso!
    return res.status(200).json({ 
      success: true, 
      message: 'Email confirmado com sucesso!',
      email: tokenData.email
    });

  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
}
