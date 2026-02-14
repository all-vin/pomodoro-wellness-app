🌿 WELLNESS APP - Proposta Completa
Pomodoro + Habit Tracker + Goal Setting
Versão: 1.0 - Design Conceitual e Arquitetura Técnica
Objetivo: App minimalista de wellness focado em foco consciente, construção de hábitos e gamificação leve

📋 ÍNDICE
Identidade Visual e Estratégia UX

Arquitetura de Telas

Fluxo de Dados e Modelo Técnico

Sistema de Gamificação

Jornada do Usuário Completa

Especificações Técnicas

Roadmap de Desenvolvimento

1. IDENTIDADE VISUAL E UX
1.1 Filosofia de Design

Princípios Norteadores:

Minimalista: Apenas elementos essenciais, máximo foco no conteúdo

Tranquilo: Paleta de cores suaves que promove calma (zero agitação visual)

Intuitivo: Navegação fluida, sem learning curve

Wellness-First: Design que prioriza bem-estar mental, não apenas produtividade

Gamificação Leve: Reforço positivo contínuo, sem punições ou "streak anxiety"

1.2 Paleta de Cores

Cores Primárias (Bem-estar):

text
Soft Green (#8FB996)   - Natureza, calma, crescimento
Warm Beige (#D4C4B0)   - Acolhimento, autenticidade
Muted Teal (#6BA899)   - Foco, clareza, equilíbrio
Cream (#F5F2ED)        - Fundo principal, leveza
Cores Secundárias (Acentos):

text
Soft Pink (#E8C8D4)    - Achievements, celebração
Warm Terracotta (#C8956B) - Energia suave, determinação
Light Lavender (#DDD5E8)  - Momentos de pausa/meditação
Charcoal (#3A3A3A)     - Texto primário, contraste
Uso Contextual:

Timer Ativo: Transição suave entre Warm Beige → Muted Teal

Habit Completo: Celebração com Soft Pink

Goal Alcançado: Warm Terracotta com animação delicada

Pausa/Break: Light Lavender para descanso visual

1.3 Tipografia

Fonte Principal: Inter ou Geist (web-safe, limpa, legível)

Display (Headings): Font-weight 600, letter-spacing -0.02em

Body (Descrições): Font-weight 400, line-height 1.6

Data/Números: Font-weight 500, monospace para timers

Hierarquia de Tamanhos:

text
H1 (Títulos Principais)   → 32px / 2rem
H2 (Seções)               → 24px / 1.5rem
H3 (Subtítulos)           → 20px / 1.25rem
Body (Texto Padrão)       → 16px / 1rem
Caption (Meta-info)       → 12px / 0.75rem
1.4 Componentes Visuais Core

Buttons:

Primary (CTA): Soft Green, padding 12px 24px, border-radius 12px, elevation suave

Secondary (Alternativa): Outline Muted Teal, mesmo padding

Ghost (Menos importante): Transparent, text-only

Cards:

Border-radius: 16px

Shadow: 0 2px 8px rgba(58, 58, 58, 0.08) (sutil)

Background: Cream ou levemente colorido por contexto

Padding: 24px (espaçamento generoso)

Ícones:

Stroke-based (não preenchimento), 24px ou 32px

Utilizados com emojis para gamificação (🌱, 🎯, 📊, etc.)

Sempre com label descritiva

1.5 Animações e Transições

Filosofia: Suaves, não distrativas. Reforçam ação sem quebrar foco.

text
Duração padrão:    300ms (transições)
Easing:            cubic-bezier(0.34, 1.56, 0.64, 1) [ease-out-back]
Espera (stagger):  30ms entre elementos sequenciais
Animações Específicas:

Timer Pomodoro: Respiro suave do número (scale 1 → 1.05 → 1)

Habit Check-in: Planta crescendo do centro da tela (scale + fade-in)

Goal Completed: Confete suave caindo (não invasivo)

Streak Display: Número com leve shake quando atualizado

Page Transitions: Fade-in 200ms (não deslize abrupto)

2. ARQUITETURA DE TELAS
2.1 TELA 1: TIMER POMODORO (Home)

Objetivo: Interface desacelerada, hiperfoco no cronômetro e sons ambientes

Layout Vertical (Top to Bottom):

text
┌─────────────────────────────────────┐
│  [← Back] Hoje     [⚙️ Configurações] │  ← Header minimalista
├─────────────────────────────────────┤
│                                       │
│          [🌧️ Chuva Suave]            │  ← Selector de som (swipeable)
│     Volume: ━━━━●━━━━ 60%            │
│                                       │
├─────────────────────────────────────┤
│                                       │
│           Deep Work                  │  ← Ciclo selecionado
│           25 min | 5 min break       │
│                                       │
│              10:15                   │  ← Timer em destaque
│           (minutos : segundos)       │
│                                       │
│          [━━━━━━●━━━━━━]             │  ← Progresso visual suave
│         Foco: 25 min | Pausa em 5min │
│                                       │
├─────────────────────────────────────┤
│    [◾ PAUSAR]  [▶️ INICIAR]         │  ← Botões primários (gestos grandes)
├─────────────────────────────────────┤
│  📌 Etapas customizadas:              │
│  • Deep Work (25m focus / 5m break)  │
│  • Leitura Leve (15m / 3m break)     │
│  • Meeting Prep (45m / 10m break)    │
│                                       │
│  [+ Criar nova etapa]                │
├─────────────────────────────────────┤
│  🎯 Metas pré-definidas para hoje:   │
│  • Estudar Python - 4 ciclos [0/4] ✓ │
│  • Ler artigo - 1 ciclo [0/1]        │
│                                       │
│  [+ Adicionar meta rápida]           │
└─────────────────────────────────────┘
Estados Interativos:

Estado	Visual	Comportamento
Idle	Timer parado, botão "INICIAR" destacado	Aguardando início
Ativo	Timer contando, transição cor Beige→Teal	Sons tocando, pode pausar
Pausa	Timer parado, botão "RETOMAR" destacado	Usuário pode cancelar ou retomar
Ciclo Finalizado	Confete suave, animação de celebração	Transição para próximo ciclo ou pausa
Break Time	Cor muda para Lavender, tipo suavizado	Sugestões de movimento/alongamento
Sons Ambientes Disponíveis:

🌧️ Chuva Suave (default)

🔥 Lareira Aconchegante

📚 Biblioteca Silenciosa

🌊 Ondas do Oceano

🎵 Lofi Hip-Hop (instrumental)

🌲 Floresta ao Entardecer

☕ Café da Manhã Tranquilo

🪶 Ar Puro (sem som)

Interações Principais:

Swipe Horizontal nos sons → navegação entre ambientes

Tap no volume → slider suave de volume

Long-press no botão → iniciar / parar com feedback háptico

Shake do device → ativa "Foco Intenso" (bloqueia notificações por 5min)

Deslize da tela para baixo → acesso rápido a controles de som

2.2 TELA 2: DASHBOARD DE HÁBITOS

Objetivo: Visualização clara de progresso diário, streaks e celebração de consistência

Layout Vertical (Top to Bottom):

text
┌─────────────────────────────────────┐
│  [🔙 Voltar]  Meus Hábitos           │  ← Header com titulo
├─────────────────────────────────────┤
│                                       │
│  📅 Domingo, 14 de Fevereiro 2026    │  ← Data e motivação
│  Você está consistente! 🌱 3 dias    │  ← Streak contador
│                                       │
├─────────────────────────────────────┤
│  🔄 HOJE - Checklist Diário:         │
│                                       │
│  [✓] Meditar 10min            🔥 7d  │  ← Habitocheck, streak badge
│       Completado às 07:15             │  ← Meta alcançada
│                                       │
│  [ ] Beber 8 copos de água    ⚪ 3d  │  ← Não completado ainda
│       Progresso: 4 / 8                │  ← Progress inline
│                                       │
│  [✓] Exercitar 30min          🔥 12d │  ← Outro hábito
│       Completado às 18:45             │
│                                       │
│  [ ] Leitura 20min            ⚪ 1d  │
│       Próxima meta: 19:00             │  ← Tempo sugerido
│                                       │
│  [+ Adicionar Hábito Rápido]         │
├─────────────────────────────────────┤
│  📊 CALENDÁRIO DO MÊS:               │
│  Seg Ter Qua Qui Sex Sab Dom         │
│  [ ] [ ] [✓] [✓] [ ] [✓] [✓]        │  ← Vizualização de célula
│  [✓] [ ] [✓] [✓] [✓] [ ] [✓]        │
│  [✓] [✓] [ ] [✓] [✓] [✓] [ ]        │
│  [✓] [✓] [✓] ✓✓ [✓] [ ]              │  ← Hoje marcado
│                                       │
│  📈 Consistência este mês: 72%       │
├─────────────────────────────────────┤
│  🌱 HISTÓRICO DE STREAKS:            │
│                                       │
│  Meditação:        ████████░░  8 dias │
│  Exercício:        ██████████░ 12 dias│
│  Água:             ███░░░░░░░  3 dias │
│  Leitura:          █░░░░░░░░░  1 dia  │
│                                       │
└─────────────────────────────────────┘
Funcionalidades Principais:

Check-in Visual:

Tap simples em [ ] para marcar como completo

Animação: ícone cresce, cor muda para Soft Pink, som suave

Confirmação: "Parabéns! Sua sequência segue forte!"

Tracking de Progresso:

Hábitos quantificáveis mostram progresso inline

Ex: "4 / 8 copos" com barra visual

Slider para adicionar quantidade

Streaks e Badges:

🔥 Streak ativo (vermelho suave = Warm Terracotta)

⚪ Streak quebrado (neutro)

⭐ Milestone: 7 dias, 30 dias, 100 dias

Calendário Compacto:

Visão do mês para verificar padrões

Cores: Verde (completo) / Cinza (não feito) / Amarelo (parcial)

Relatório Diário Rápido:

"Consistência hoje: 2 / 4 hábitos (50%)"

Atualiza em tempo real conforme marca hábitos

2.3 TELA 3: CENTRAL DE METAS

Objetivo: Visão estratégica de objetivos maiores e como Pomodoro + Hábitos os suportam

Layout Vertical (Top to Bottom):

text
┌─────────────────────────────────────┐
│  [🔙 Voltar]  Minhas Metas          │
├─────────────────────────────────────┤
│                                       │
│  🎯 METAS ATIVAS                    │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ Meta: Aprender Python            │ │
│  │                                   │ │
│  │ Objetivo: Completar 50h curso    │ │
│  │ Progresso: 12 / 50 horas         │ │
│  │ ─────────────●──────── 24%       │ │
│  │                                   │ │
│  │ 📌 Conectado a:                  │ │
│  │ • Ciclo Pomodoro "Deep Work"     │ │
│  │ • Hábito "Estudar 1h/dia"        │ │
│  │                                   │ │
│  │ 📊 Esta semana: 5h 30min         │ │
│  │ 🔄 Última atualização: hoje 14h  │ │
│  │                                   │ │
│  │ [📝 Editar] [❌ Cancelar]        │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ Meta: Ler 12 Livros este ano    │ │
│  │                                   │ │
│  │ Objetivo: 12 livros              │ │
│  │ Progresso: 2 / 12 livros         │ │
│  │ ─────────────●──────── 17%       │ │
│  │                                   │ │
│  │ 📌 Conectado a:                  │ │
│  │ • Ciclo Pomodoro "Leitura Leve"  │ │
│  │ • Hábito "Ler 30min/dia"         │ │
│  │                                   │ │
│  │ [📝 Editar] [❌ Cancelar]        │ │
│  └─────────────────────────────────┘ │
│                                       │
│  [+ Criar Nova Meta]                 │
├─────────────────────────────────────┤
│                                       │
│  ✅ METAS ALCANÇADAS                │
│                                       │
│  ✓ Correr uma meia-maratona        │
│    Alcançada em 28 de janeiro      │
│    Tempo total dedicado: 48 horas   │
│    Celebração desbloqueada: 🏅      │
│                                       │
│  ✓ Meditar 30 dias consecutivos    │
│    Alcançada em 10 de fevereiro    │
│    Celebração desbloqueada: 🧘      │
│                                       │
└─────────────────────────────────────┘
Funcionalidades Principais:

Card de Meta:

Título + descrição breve

Barra de progresso visual (não numérica por padrão)

Conexão clara com Pomodoro Cycles + Hábitos

Botões para editar ou cancelar

Tracking de Progresso:

Porcentagem calculada automaticamente

Histórico semanal: "Esta semana: 5h 30min"

Tempo total dedicado (gamificação: "Você já investiu 12 horas nessa meta!")

Création de Meta (Modal):

Nome

Tipo (Horas, Quantidade, Sim/Não)

Data alvo (opcional)

Conectar a Ciclo Pomodoro específico

Conectar a Hábito existente

Metas Alcançadas:

Visualização separada de sucesso

Celebração com unlock de badge/tema visual

Reconhecimento do tempo investido

Smart Suggestions:

Baseado em padrão de Pomodoros, sugerir próximas metas

Ex: "Você tem 15 ciclos de Deep Work completados. Que tal estabelecer meta em algo relacionado?"

2.4 TELA 4: RELATÓRIOS E PERFIL

Objetivo: Reflexão semanal/mensal sobre produtividade consciente e insights

Layout com Abas (Relatórios | Perfil)

Aba 1: RELATÓRIOS

text
┌─────────────────────────────────────┐
│  [🔙 Voltar]  Relatórios      [Abas]│
├─────────────────────────────────────┤
│  📅 Semana de 10-16 de Fevereiro   │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ 📊 RESUMO SEMANAL                │ │
│  │                                   │ │
│  │ Horas de Foco: 21h 30min        │ │
│  │ Ciclos Pomodoro: 51 ciclos      │ │
│  │ Hábitos Completados: 24/28      │ │
│  │ Consistência: 86%                │ │
│  │                                   │ │
│  │ 🌱 Progresso de Metas:           │ │
│  │ • Python: +2h (total 12h)       │ │
│  │ • Leitura: +1.5h (total 4h)     │ │
│  │                                   │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ 📈 GRÁFICO DIÁRIO - HORAS FOCO  │ │
│  │                                   │ │
│  │   Seg: ████ 3h 15m               │ │
│  │   Ter: █████░ 3h 45m             │ │
│  │   Qua: ██████░ 4h 20m            │ │
│  │   Qui: █████░ 3h 50m             │ │
│  │   Sex: ███████ 4h 10m            │ │
│  │   Sab: ██░ 2h 05m                │ │
│  │   Dom: ████░ 3h 10m              │ │
│  │                                   │ │
│  │  Média: 3h 36min/dia             │ │
│  │  Meta semanal: 21h ✓ Alcançada!  │ │
│  │                                   │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ 🎨 TOP 3 ATIVIDADES             │ │
│  │                                   │ │
│  │ 1. Deep Work: 15h 40m (73%)     │ │
│  │    Frequência: 51 ciclos        │ │
│  │                                   │ │
│  │ 2. Leitura Leve: 4h 20m (20%)   │ │
│  │    Frequência: 17 ciclos        │ │
│  │                                   │ │
│  │ 3. Meeting Prep: 1h 30m (7%)    │ │
│  │    Frequência: 3 ciclos         │ │
│  │                                   │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ 🔥 HÁBITOS - CONSISTÊNCIA       │ │
│  │                                   │ │
│  │ Meditação:   ██████████░ 86%    │ │
│  │ Exercício:   █████░░░░░░ 58%    │ │
│  │ Água:        ████░░░░░░░ 42%    │ │
│  │ Leitura:     ███████░░░░ 71%    │ │
│  │                                   │ │
│  └─────────────────────────────────┘ │
│                                       │
│  [Mês Anterior] [Próximo Mês]       │
│                                       │
│  [🗂️ Exportar Relatório PDF]        │
│                                       │
├─────────────────────────────────────┤
│  💡 INSIGHT SEMANAL:                 │
│  Você foi 12% mais consistente     │
│  em hábitos quando meditava antes  │
│  das sessões de foco. Que tal      │
│  adicionar meditação 5min antes    │
│  do Deep Work?                      │
│                                       │
│  [✓ Adicionar à Rotina]             │
└─────────────────────────────────────┘
Aba 2: PERFIL

text
┌─────────────────────────────────────┐
│  [🔙 Voltar]  Perfil         [Abas]  │
├─────────────────────────────────────┤
│                                       │
│  👤 SEU PERFIL                      │
│                                       │
│  [Avatar Placeholder]               │
│  Carolina Martins                   │
│  @carolinam                         │
│  Niterói, Rio de Janeiro            │
│                                       │
│  Membro desde: Janeiro 2026         │
│  Streak máximo: 12 dias             │
│  Total de Horas Focadas: 47h 30min  │
│                                       │
│  [✏️ Editar Perfil] [⚙️ Configurações]│
│                                       │
├─────────────────────────────────────┤
│                                       │
│  🏆 DESTAQUES & BADGES              │
│                                       │
│  🌱 Iniciante (Dia 1)               │ │
│  Completou seu primeiro ciclo       │
│                                       │
│  🔥 Consistência (7 dias)           │
│  Manteve 1 hábito por 7 dias        │
│                                       │
│  🎯 Objetivo Alcançado               │
│  Completou uma meta                 │
│                                       │
│  💚 Bem-estar Priorizado            │
│  Meditou 10 dias                    │
│                                       │
│  📚 Aprendiz                        │
│  Completou 50 horas de Pomodoro    │
│                                       │
│  🌟 (Próximo: 100 horas - 47/100)  │
│                                       │
├─────────────────────────────────────┤
│                                       │
│  🎨 TEMAS VISUAIS DESBLOQUEADOS    │
│                                       │
│  • Tema Padrão: Wellness Suave      │
│  • Tema: Floresta Oculta (desbloqueado) │
│  • Tema: Oceano Noturno (desbloqueado) │
│  • Tema: Montanha Zen (5% progresso) │
│                                       │
│  [🎨 Visualizar Todos os Temas]     │
│                                       │
├─────────────────────────────────────┤
│                                       │
│  ⚙️ PREFERÊNCIAS                    │
│                                       │
│  • Notificações: Ativadas           │
│  • Som: Ativado                     │
│  • Haptic Feedback: Ativado         │
│  • Tema Claro/Escuro: Automático    │
│  • Idioma: Português (BR)           │
│  • Dados Privados: Sim              │
│                                       │
│  [🔗 Conectar com Amigos]           │
│  [📤 Exportar Dados]                │
│  [🗑️ Limpar Histórico]              │
│                                       │
├─────────────────────────────────────┤
│  Versão: 1.0.1                      │
│  [❓ Ajuda] [🐛 Reportar Bug]      │
│  [👥 Sobre o Desenvolvedor]        │
│  [📜 Termos de Serviço]             │
└─────────────────────────────────────┘
3. FLUXO DE DADOS E ARQUITETURA TÉCNICA
3.1 Modelo de Dados (Data Schema)

json
{
  "User": {
    "id": "UUID",
    "name": "string",
    "email": "string",
    "createdAt": "timestamp",
    "preferences": {
      "theme": "enum: light | dark | auto",
      "soundDefault": "enum: rain | fireplace | lofi | ocean | etc",
      "notifications": "boolean",
      "language": "string"
    },
    "stats": {
      "totalFocusHours": "number",
      "totalPomodoros": "number",
      "currentStreaks": "array",
      "longestStreak": "number"
    }
  },

  "PomodoroSession": {
    "id": "UUID",
    "userId": "UUID",
    "cycleType": "enum: deepWork | lightReading | meetingPrep | custom",
    "focusDuration": "number (minutes)",
    "breakDuration": "number (minutes)",
    "soundAmbient": "enum: rain | fireplace | lofi | etc",
    "volumeLevel": "number (0-100)",
    "startedAt": "timestamp",
    "endedAt": "timestamp",
    "completed": "boolean",
    "linkedMeta": "UUID (reference to Goal)",
    "linkedHabit": "UUID (reference to Habit)",
    "notes": "string"
  },

  "Habit": {
    "id": "UUID",
    "userId": "UUID",
    "name": "string",
    "description": "string",
    "emoji": "string",
    "frequency": "enum: daily | weekdays | weekends | weekly | custom",
    "customDays": "array of days if custom",
    "trackingType": "enum: boolean | quantitative",
    "targetQuantity": "number (if quantitative)",
    "unit": "string (ex: 'copos', 'minutos')",
    "createdAt": "timestamp",
    "isActive": "boolean",
    "checkIns": [
      {
        "date": "timestamp",
        "completed": "boolean",
        "quantity": "number (if applicable)",
        "notes": "string"
      }
    ],
    "streaks": {
      "current": "number",
      "longest": "number",
      "lastCompletedDate": "timestamp"
    }
  },

  "Goal": {
    "id": "UUID",
    "userId": "UUID",
    "title": "string",
    "description": "string",
    "type": "enum: hours | quantity | milestone | boolean",
    "targetValue": "number",
    "unit": "string",
    "targetDate": "timestamp (optional)",
    "createdAt": "timestamp",
    "completedAt": "timestamp (optional)",
    "status": "enum: active | completed | paused | cancelled",
    "linkedCycles": ["array of PomodoroSession IDs"],
    "linkedHabits": ["array of Habit IDs"],
    "progress": {
      "current": "number",
      "milestone": "number",
      "percentage": "number"
    },
    "insights": [
      {
        "week": "timestamp",
        "hoursLogged": "number",
        "habitsCompleted": "number"
      }
    ]
  },

  "Report": {
    "id": "UUID",
    "userId": "UUID",
    "period": "enum: daily | weekly | monthly",
    "startDate": "timestamp",
    "endDate": "timestamp",
    "generatedAt": "timestamp",
    "metrics": {
      "totalFocusHours": "number",
      "totalSessions": "number",
      "consistency": "number (percentage)",
      "habitsCompleted": "number",
      "habitsTotal": "number"
    },
    "topCycles": [
      {
        "cycleType": "string",
        "hours": "number",
        "percentage": "number"
      }
    ],
    "habitConsistency": [
      {
        "habitId": "UUID",
        "habitName": "string",
        "completionRate": "number",
        "streak": "number"
      }
    ],
    "insights": "array of string (AI-generated insights)"
  },

  "Achievement": {
    "id": "UUID",
    "userId": "UUID",
    "type": "enum: badge | theme | milestone",
    "name": "string",
    "description": "string",
    "icon": "string (emoji or SVG)",
    "condition": "string (what triggers it)",
    "unlockedAt": "timestamp"
  }
}
3.2 Fluxo de Dados Entre Telas

text
┌──────────────────────────────────────────────────────┐
│                    TIMER POMODORO                    │
│  (Tela 1 - Produção de dados em tempo real)          │
└────────────┬──────────────────────────────┬──────────┘
             │                              │
             ▼                              ▼
      ┌──────────────┐            ┌──────────────────┐
      │ PomodoroData │            │ SessionMetadata  │
      │ - duration   │            │ - startTime      │
      │ - cycles     │            │ - linkedMeta     │
      └──────┬───────┘            └────────┬─────────┘
             │                             │
             ▼─────────────────────────────▼
        ┌──────────────────────────────────┐
        │    CACHE LOCAL (SQLite)          │
        │  [Real-time Session Storage]     │
        └──────────────────────────────────┘
             │
             ├──────────────────┬──────────────────┐
             │                  │                  │
        (quando completa)   (ao salvar)      (ao gerar report)
             │                  │                  │
             ▼                  ▼                  ▼
        ┌──────────┐      ┌──────────┐    ┌──────────────┐
        │ Habit    │      │ Goal     │    │  Report      │
        │ Check-in │      │ Progress │    │  Aggregation │
        │ Update   │      │ Update   │    │              │
        └────┬─────┘      └────┬─────┘    └──────┬───────┘
             │                 │                 │
             ▼                 ▼                 ▼
        Aba 2:            Aba 3:            Aba 4:
        Dashboard         Metas         Relatórios
3.3 Endpoints de API (Backend)

Autenticação:

text
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh-token
Sessões Pomodoro:

text
POST /pomodoro/sessions/start
PATCH /pomodoro/sessions/:id/pause
PATCH /pomodoro/sessions/:id/resume
PATCH /pomodoro/sessions/:id/complete
GET /pomodoro/sessions/:id
GET /pomodoro/cycles (tipos de ciclos)
Hábitos:

text
POST /habits (criar)
GET /habits (listar ativos)
GET /habits/:id
PATCH /habits/:id (editar)
DELETE /habits/:id
POST /habits/:id/check-in (marcar como completo)
GET /habits/:id/history (calendário)
GET /habits/:id/stats (streaks, consistência)
Metas:

text
POST /goals (criar)
GET /goals (listar ativos)
GET /goals/:id
PATCH /goals/:id (editar)
DELETE /goals/:id
GET /goals/:id/progress (atualizar progresso auto)
Relatórios:

text
GET /reports/daily/:date
GET /reports/weekly/:weekStart
GET /reports/monthly/:monthStart
POST /reports/export/pdf
GET /insights/suggestions (AI-driven)
Achievements:

text
GET /achievements (listar desbloqueados)
GET /achievements/all (todos, com status)
POST /achievements/:id/track (para debugging)
3.4 Stack Técnico Recomendado

Frontend:

text
Framework: React Native (Expo) para iOS/Android
           Web: Next.js (PWA capability)
UI Library: Tailwind CSS / NativeWind
State: Zustand (gerenciamento de estado leve)
Dados: SQLite (local), Firebase Realtime DB (sync)
Audio: react-native-sound ou Expo Audio
Gráficos: react-native-chart-kit
Backend:

text
Runtime: Node.js (Express ou Fastify)
DB: PostgreSQL (relacional) + Redis (cache)
Auth: JWT + OAuth2 (Google, Apple Sign-In)
ML/Insights: Python + FastAPI (sugestões via IA)
File Storage: Firebase Storage (reports PDF)
Hosting: AWS EC2 / DigitalOcean / Railway
DevOps:

text
CI/CD: GitHub Actions
Containerization: Docker
Monitoring: Sentry (error tracking)
Analytics: Segment (user tracking)
4. SISTEMA DE GAMIFICAÇÃO
4.1 Filosofia: Reforço Positivo Apenas

Premissa: Não castigar nunca. Reforçar sempre.

Anti-padrões (NÃO fazer):

❌ "Sua sequência foi quebrada!" (culpa)

❌ Punições por perda de streak

❌ "Você falhou hoje"

❌ Notificações agressivas

Padrão (FAZER):

✅ "Voltamos ao ritmo! Que tal tentar novamente amanhã?"

✅ Celebração mesmo de pequenas vitórias

✅ Reconhecimento do esforço anterior

✅ Convites suaves para próximas ações

4.2 Sistema de Badges e Achievements

text
NÍVEL: INICIANTE (Dias 1-7)
├─ 🌱 Primeiro Ciclo
│  └─ Ao completar 1° Pomodoro
│  └─ Reward: "Você começou sua jornada de foco!"
│
├─ 🎯 Primeira Meta
│  └─ Ao criar primeira meta
│  └─ Reward: Unlock tema "Floresta Oculta"
│
└─ 📝 Primeiro Hábito
   └─ Ao criar e completar 1 hábito
   └─ Reward: Sound "Floresta ao Entardecer"

NÍVEL: EXPLORADOR (Dias 8-30)
├─ 🔥 Streak de 7 Dias
│  └─ Manter 1 hábito por 7 dias
│  └─ Reward: "Parabéns! Você está construindo consistência"
│  └─ Visual: ícone 🔥 ao lado do hábito
│
├─ 💯 50 Horas Focadas
│  └─ Atingir 50h de Pomodoro
│  └─ Reward: Theme "Oceano Noturno"
│
├─ 🎨 Colecionador de Ciclos
│  └─ Usar 5 tipos de ciclo diferentes
│  └─ Reward: Unlock 3 novos sounds
│
└─ 📈 Relatório de Progresso
   └─ Consultar relatório semanal 3x
   └─ Reward: "Você está atento ao seu progresso!"

NÍVEL: MESTRE (Dias 31+)
├─ 🌟 30 Dias Consecutivos
│  └─ Manter 1 hábito por 30 dias
│  └─ Reward: Theme "Montanha Zen" + Custom Badge
│
├─ 🏆 Meta Alcançada
│  └─ Completar uma goal
│  └─ Reward: "Sua dedicação rendeu frutos! 🎉"
│  └─ Visual: Confete suave na tela
│
├─ 📚 100 Horas Focadas
│  └─ Atingir 100h de Pomodoro
│  └─ Reward: Unlock tema premium "Aurora Borealis"
│
└─ 🧘 Bem-estar Primeiro
   └─ Conectar todos os hábitos a Pomodoro
   └─ Reward: "Você criou uma rotina harmonizada!"
4.3 Progresso de Temas Visuais

Temas Desbloqueáveis:

Tema	Unlock	Descrição	Cores
Wellness Suave	Default	Paleta padrão	Beige + Teal
Floresta Oculta	1ª Meta	Tons de verde escuro + dourado	Verde + Ouro
Oceano Noturno	50h Pomodoro	Azul escuro + prata	Azul Navy + Prata
Montanha Zen	30 dias streak	Cinza + roxo suave	Cinza + Lavanda
Aurora Borealis	100h Pomodoro	Verde fluorescente + roxo	Neon Verde + Roxo
Café da Manhã	100 hábitos	Laranja quente + creme	Terracota + Creme
4.4 Gatilhos de Valor (Micro-interações)

Ao Completar um Pomodoro:

text
├─ Sound: Sino suave (200ms)
├─ Visual: Número do timer "sai" da tela (scale up + fade out)
├─ Mensagem: "Ciclo completo! Descanse um pouco."
├─ Haptic: Vibração leve (10ms)
└─ Analytics: Log de progresso
Ao Completar um Hábito:

text
├─ Sound: Sino com harmônico (300ms)
├─ Visual: Planta cresce do centro (scale animation)
├─ Mensagem: "Parabéns! Seu jardim cresceu 🌱"
├─ Haptic: Vibração em padrão (success pattern)
├─ Progress: Adiciona à contagem do dia
└─ Milestone: Se streak atinge 7/30/100, celebra
Ao Alcançar uma Meta:

text
├─ Sound: Fanfarra suave (1s)
├─ Visual: Confete cai (max 50 partículas)
├─ Mensagem: "Meta Alcançada! 🎉 [nome da meta]"
├─ Haptic: Vibração em padrão (victory pattern)
├─ Reward: Unlock novo tema ou sound
├─ Screenshot: Botão para compartilhar achievement
└─ Analytics: Registra momento exato
Ao Abrir App Após 24h sem atividade:

text
├─ Mensagem: "Bem-vindo de volta! Que tal um ciclo hoje?"
├─ Visual: Leve animação de entrada
├─ Haptic: Notificação padrão
└─ Sugestão: Próximo hábito sugerido
5. JORNADA DO USUÁRIO - DIA COMPLETO
5.1 Timeline: 06:30 - 22:00

text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 06:30 - ACORDAR E ABRIR O APP
─────────────────────────────────────────────────────────

1️⃣ PRIMEIRA TELA: Dashboard de Hábitos
   • App mostra check-list diário
   • 4 hábitos para hoje: Meditar, Beber Água, Exercitar, Ler
   • Notificação suave: "Bom dia! Seus hábitos o esperam."
   • User tapa em "Meditar 10min" → marca completo
   • Animação: Planta cresce suavemente
   • Som: Sino tranquilo (sem alarme agressivo)

2️⃣ REFLEXO IMEDIATO:
   • Streak "Meditação" agora é 🔥 5 dias
   • Mensagem de encorajamento: "Você está consistente!"
   • Progress bar do dia: 1/4 hábitos completos (25%)

✅ RESULTADO: User começa o dia com senso de vitória

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 07:15 - CAFÉ DA MANHÃ & CHECK DE METAS
─────────────────────────────────────────────────────────

3️⃣ TAB METAS - Central de Metas
   • User vê 3 metas ativas:
     1. "Aprender Python - 12/50h" (24%)
     2. "Ler 12 Livros - 2/12" (17%)
     3. "Correr Meia-Maratona - Progresso"
   
   • Insight sugerido: 
     "Você dedicou 3h a Python esta semana. 
      Continue nesse ritmo e alcança 15h em 2 meses!"

   • User clica em "Aprender Python"
   • Sistema sugere: "Quer iniciar uma sessão Deep Work agora?"

✅ RESULTADO: User sente propósito claro para o dia

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 08:00 - INÍCIO DO TRABALHO - POMODORO DEEP WORK
─────────────────────────────────────────────────────────

4️⃣ TAB TIMER POMODORO
   • User volta para TELA 1 (Timer)
   • Seleciona ciclo: "Deep Work" (25min focus / 5min break)
   • Seleciona ambiente sonoro: 🌧️ "Chuva Suave" (som tocando)
   • Volume: 60%
   • Conecta a meta: "Aprender Python"
   • Tapa: [▶️ INICIAR]

5️⃣ DURANTE O TIMER (25 MINUTOS):
   • App fica em primeiro plano
   • Número do timer respira suavemente (scale animation)
   • Progresso visual: Barra preenche de forma suave
   • Som: Chuva continuando ao fundo
   • Se user sai do app: ⚠️ "Foco Interrompido" (opção de retornar)
   • Shake do device ativa "Foco Intenso" (bloqueia notificações 5min)

✅ DURANTE: Sensação de foco preservada, ambiente calmo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 08:25 - CICLO COMPLETADO
─────────────────────────────────────────────────────────

6️⃣ CICLO FINALIZADO:
   • Som: Sino suave + harmônico (300ms)
   • Visual: Número "sai voando" (fade out animation)
   • Mensagem: "Ciclo 1 completo! Descanse 5 minutos ☕"
   • Confete suave (20 partículas caem pela tela)
   • Botão: [Iniciar Break] ou [Pular Break]
   • User vê: "+25 min adicionados a Aprender Python"
   • Stats atualizadas: 12h 25min total (era 12h)

✅ RESULTADO: Celebração clara, mas não invasiva

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 08:30 - BREAK TIME
─────────────────────────────────────────────────────────

7️⃣ DURANTE O BREAK (5 MINUTOS):
   • Cor da tela muda para Lavender (sugestão de descanso)
   • Timer segue, mas visual é diferente
   • Mensagem: "Bom! Saia um pouco. Estique-se, beba água! 💧"
   • Sound muda para "Ar Puro" (sem som)
   • Notificação: "Faltam 2 minutos para próximo ciclo"

✅ DURANTE: Repouso visual, incentivo a sair da tela

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 08:35 - SEGUNDO CICLO
─────────────────────────────────────────────────────────

8️⃣ USER RETORNA:
   • App sugere: "Iniciar ciclo 2 de Deep Work?"
   • User tapa em [▶️ INICIAR] novamente
   • Mesmo processo: 25min deep work

   (Repete 3 mais vezes para total de 4 ciclos = 100min)

✅ FLUXO: Consistência é reforçada por interface previsível

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 12:15 - APÓS 4 CICLOS (100 MINUTOS) - ALMOÇO
─────────────────────────────────────────────────────────

9️⃣ RESUMO DA MANHÃ:
   • Tela mostra: "Você completou 4 ciclos Deep Work!"
   • Progresso de meta atualizado: "Aprender Python - 13h 40m / 50h (27%)"
   • Mensagem: "Ótimo trabalho esta manhã! 🌱"
   • Stats: Strain contador próximo: Hábito "Exercitar 30min"
   • Lembrete: "Você precisa sair para almoçar (desconecte!)"

✅ RESULTADO: Reconhecimento do esforço, sugestão de autossegurança

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 12:30 - ALMOÇO E EXERCÍCIO
─────────────────────────────────────────────────────────

🔟 HÁBITO "EXERCITAR 30MIN":
    • User marca como completo no Dashboard
    • App mostra: "Exercício registrado! 💪"
    • Animação: Badge 🔥 "Consistência 5 dias"
    • Mensagem: "Seu corpo agradece! Que tal mais um ciclo?"

✅ RESULTADO: Gamificação do bem-estar físico

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 14:00 - TURNO DA TARDE - CICLOS MAIS LEVES
─────────────────────────────────────────────────────────

1️⃣1️⃣ SEGUNDA META: LEITURA
    • User abre app
    • Ve sugestão: "Meta secundária: Ler 20min?"
    • Seleciona ciclo: "Leitura Leve" (15min / 3min break)
    • Ambiente: 📚 "Biblioteca Silenciosa"
    • Conecta a meta: "Ler 12 Livros"
    • Inicia

✅ CONTEXTO: App sugere com inteligência baseada em metas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 15:30 - FINAL DO TURNO DA TARDE
─────────────────────────────────────────────────────────

1️⃣2️⃣ PAUSE PARA REFLEKTIR:
    • User marca hábito "Beber 8 copos de água": 5/8 completos
    • Dashboard mostra progresso atualizado
    • Notificação: "Você está muito bem hoje! 73% de consistência"
    
✅ RESULTADO: Reforço positivo contínuo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 19:00 - NOITE - HÁBITO FINAL
─────────────────────────────────────────────────────────

1️⃣3️⃣ HÁBITO "MEDITAR 10MIN":
    • User abre app antes de dormir
    • Dashboard mostra: 3/4 hábitos completos (75%)
    • Último hábito: "Meditar 10min" [  ] (não feito)
    • User marca como completo
    • Animação: ✅ Marcado! Streak 🔥 Meditação: 6 dias

1️⃣4️⃣ LEITURA FINAL DO DIA:
    • User seleciona ciclo: "Leitura Leve"
    • Ambiente: 🌙 "Noite Estrelada" (novo som desbloqueado)
    • Inicia 20min de leitura

✅ RESULTADO: App facilita reflexão noturna

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 21:30 - ENCERRAMENTO DO DIA
─────────────────────────────────────────────────────────

1️⃣5️⃣ RELATÓRIO DIÁRIO AUTOMÁTICO:
    • User abre TELA 4 (Relatórios) → Aba "Relatórios"
    • Vê resumo do dia:
      └─ Horas de Foco: 4h 15min
      └─ Ciclos Completos: 9 ciclos
      └─ Hábitos Completados: 4/4 (100%) 🎉
      └─ Consistência: 100%
      └─ Progresso de Metas:
         • Python: +1h 45min (total 13h 40min)
         • Leitura: +35min (total 4h 35min)

1️⃣6️⃣ INSIGHT DIÁRIO:
    • Sistema exibe: 
      "Parabéns! Dia 100% consistente! 🌱
       Você é uma máquina de produtividade consciente.
       Que tal estabelecer uma meta nova?"

1️⃣7️⃣ CELEBRAÇÃO:
    • Se alcançou milestone (ex: 100 horas): 
      └─ Novo tema desbloqueado: "Aurora Borealis"
      └─ Badge ganha: 📚 "Aprendiz - 100h focadas"
      └─ Mensagem: "Você desbloqueou um novo tema!"

✅ RESULTADO: Encerramento do dia com sensação de vitória

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 22:00 - NOTIFICAÇÃO PRÉ-SONO
─────────────────────────────────────────────────────────

1️⃣8️⃣ ÚLTIMA INTERAÇÃO:
    • Notificação suave: "Durma bem! Seu dia foi excelente."
    • App entra em modo noturno (Dark mode automático)
    • Relatório salvo e sincronizado ao servidor
    • Agenda do dia seguinte carregada

✅ FIM: User dorme com sensação de realização
6. ESPECIFICAÇÕES TÉCNICAS
6.1 Performance & Constraints

Métrica	Alvo	Justificativa
App Launch	< 2s	Fluidez necessária para iniciar rápido
Timer Response	< 100ms	Feedback visual crítico
Page Navigation	< 300ms	Transições suaves
Data Sync	< 5s	Sincronização em background
Battery Usage	< 5% (12h)	Precisamos rodar o app o dia todo
Storage	< 150MB	Sem dados locais pesados
6.2 Segurança & Privacy

Dados do Usuário:

Criptografia AES-256 para dados em repouso

TLS 1.3 para transmissão

Hash de senhas com bcrypt (salt 12+)

GDPR + LGPD compliant

Dados de Hábitos/Metas:

Localmente armazenados no device primeiro

Sincronização opcional para cloud

Usuário pode exportar dados em JSON

Opção de "data minimization" (não rastrear dados sensíveis)

6.3 Implementação de Sons

Ambient Sounds (Looping):

Arquivo: MP3 320kbps, comprimido

Loop suave: Crossfade 500ms nas junções

Volume: Controlado por slider 0-100%

Fallback: Se sem internet, usa audio local

Notification Sounds (Curtos):

Sino: .wav 16-bit, 44.1kHz, ~ 200ms

Fanfarra: .wav 16-bit, 44.1kHz, ~ 1s

Todos pre-loaded na memória para latência zero

6.4 Experiência Offline

Funcionalidade Offline:

✅ Timer Pomodoro (totalmente offline)

✅ Habit check-ins (sincroniza depois)

✅ Relatórios (calculados localmente)

✅ Leitura de histórico

❌ Sincronização com servidor

❌ Novos downloads de sounds

❌ Sharing com amigos (pendente reconexão)

Sincronização:

When back online: Automatic sync via background task

Conflict resolution: Last-write-wins + versioning

Notification: "Seus dados foram sincronizados!"

7. ROADMAP DE DESENVOLVIMENTO
Fase 1: MVP (Q1 2026 - 8 semanas)

Core Features:

✅ Timer Pomodoro com 3 ciclos pré-definidos

✅ Habit Tracker básico (check-in diário)

✅ 2 metas de exemplo

✅ Relatório diário/semanal

✅ 5 sounds ambientes

✅ 3 themes desbloqueáveis

✅ iOS (primário) + PWA (secondary)

Não Incluir:

❌ Multiplayer / Social

❌ IA-driven insights

❌ Integração com Health apps

❌ Custom ciclos avançados

Fase 2: Consolidação (Q2 2026 - 8 semanas)

Novas Features:

✅ Custom ciclos Pomodoro (user-defined)

✅ Integração Apple Health / Google Fit

✅ Análise correlacional (Pomodoro ↔ Hábitos)

✅ 10+ themes desbloqueáveis

✅ Android app estável

✅ Dark mode melhorado

Melhorias:

✅ Onboarding inteligente

✅ Notifications otimizadas

✅ Performance: < 1.5s launch

Fase 3: Expansão Social (Q3 2026 - 8 semanas)

Novas Features:

✅ Share achievements com amigos

✅ Focus sessions com amigos (live)

✅ Leaderboards privadas

✅ Desafios mensais comunitários

✅ IA insights: "Por que você foi mais produtivo Terça?"

Não Fazer:

❌ Comparação pública (privacidade primeiro)

❌ Competição agressiva

Fase 4: Ecossistema (Q4 2026 - Ongoing)

Integrações:

✅ Zapier / IFTTT

✅ Slack integration (notificações, stats)

✅ Calendar sync

✅ Email digest (semanal/mensal)

Monetização:

✅ Freemium: Core features grátis

✅ Premium: $4.99/mês

Unlimited custom ciclos

IA insights avançados

Temas premium

Sincronização prioritária

Suporte prioritário

📊 COMPARAÇÃO COM REFERÊNCIAS
Aspecto	Forest	Tide	Streaks	MeuApp
Foco Principal	Pomodoro + Gamificação	Sons + Meditation	Habit Tracking	Tudo integrado
Gamificação	Forte (árvores)	Leve	Moderada	Positiva apenas
Sounds	Limitados	Extensos	Não	Moderados curados
Relatórios	Básicos	Meditações	Detalhados	Correlacionais
Integração	Timer↔Árvores	Meditações	Habits↔Health	Timer↔Habits↔Metas
UX	Gamificada	Wellness	Simples	Minimalista Wellness
Preço	$1.99 (único)	$4.99/mês	$5.99 (único)	$4.99/mês
Vantagem	Motivação lúdica	Design tranquilo	Simplicidade	Holístico + sem punição
🎯 MÉTRICAS DE SUCESSO
Fase MVP (8 semanas):

 500 downloads

 4.5+ rating

 30% DAU (daily active users)

 < 100ms timer latency

 Zero crashes em produção

Fase 1 (3 meses):

 5k downloads

 40% DAU

 60% retention após 7 dias

 3+ horas média session time/semana

 NPS > 50

Fase 2 (6 meses):

 25k downloads

 1.0 multiplicador de metas alcançadas vs criadas

 50% dos usuários usam 3+ features

 80% habitual para 1 hábito

 Revenue: $2-5k MRR

📝 PRÓXIMOS PASSOS
Design de Alta Fidelidade

Criar wireframes + protótipo interativo em Figma

Validar com 10-15 usuários beta

Ajustar UX baseado em feedback

Desenvolvimento

Setup do repo GitHub com estrutura inicial

Implementar timer Pomodoro core

Build local storage + data sync

Testes & Validação

Alpha interno (equipe dev 2 semanas)

Beta com 50 usuários convidados (2 semanas)

App Store review & launch

Launch & Growth

Product Hunt debut

Comunidades de produtividade (Reddit, Discord)

Partnerships com habit-forming apps

🌿 FILOSOFIA FINAL
Este app não é sobre ser mais produtivo a qualquer custo.

É sobre ser consistente sem sacrificar bem-estar.

Cada feature foi desenhada para:

Celebrar progresso (não punir ausência)

Criar hábitos sustentáveis (não burn-out)

Conectar foco com propósito (não apenas "ficar ocupado")

Priorizar privacidade e saúde mental

O design minimalista e a paleta suave reforçam que produtividade é um processo, não uma competição.

🌱 Grow at your own pace.
