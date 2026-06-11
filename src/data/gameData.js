const COLOR_WORDS = ['red','orange','yellow','green','blue','purple','pink','black','white','brown','gray','grey','gold','silver','teal','cyan','magenta','violet','indigo','maroon','navy','crimson','scarlet','turquoise','lime','beige','tan']
const NUMBER_WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million','billion','dozen','couple','few','dozens']
const BODY_PARTS = ['head','eye','eyes','ear','ears','nose','mouth','arm','arms','elbow','elbows','hand','hands','finger','fingers','leg','legs','knee','knees','foot','feet','toe','toes','heart','brain','hip','hips','neck','shoulder','shoulders','back','chest','belly','stomach','lung','lungs','bone','bones','skin','hair','tooth','teeth','lip','lips','chin','cheek','cheeks','throat','thumb','thumbs','ankle','wrist','spine','rib','ribs','jaw','tongue','face','gut','heel','palm','palms','nail','nails','brow']

function tokens(text) { return (text || '').toLowerCase().split(/[^a-z]+/).filter(Boolean) }

export const RULES = [
  { id:'color',    glyph:'🎨', label:'Color word',             full:'Your answer must include a COLOR word.',
    check: a => tokens(a).some(t => COLOR_WORDS.includes(t)) },
  { id:'twowords', glyph:'✌️', label:'At least two words',     full:'Your answer must be AT LEAST two words.',
    check: a => (a||'').trim().split(/\s+/).filter(Boolean).length >= 2 },
  { id:'number',   glyph:'🔢', label:'A number, spelled',      full:'Your answer must include a NUMBER written as a word.',
    check: a => tokens(a).some(t => NUMBER_WORDS.includes(t)) },
  { id:'body',     glyph:'🦵', label:'A body part',            full:'Your answer must include a BODY PART.',
    check: a => tokens(a).some(t => BODY_PARTS.includes(t)) },
  { id:'exclaim',  glyph:'❗', label:'Ends with a bang',       full:'Your answer must END with an exclamation mark!',
    check: a => (a||'').trim().endsWith('!') },
  { id:'titlecase',glyph:'Aa', label:'Title Case',             full:'Every Word Must Be In Title Case.',
    check: a => { const w=(a||'').trim().split(/\s+/).filter(Boolean); return w.length>0 && w.every(x=>/^[A-Z]/.test(x)) } },
  { id:'lower',    glyph:'aa', label:'all lowercase',          full:'your whole answer must be lowercase only.',
    check: a => (a||'').trim().length>0 && (a||'')===(a||'').toLowerCase() },
  { id:'question', glyph:'❓', label:'Ends as a question',     full:'Your answer must end with a question?',
    check: a => (a||'').trim().endsWith('?') },
  { id:'noe',      glyph:'🚫', label:'No letter E',            full:'Your answer must contain NO letter E anywhere.',
    check: a => (a||'').trim().length>0 && !/e/i.test(a||'') },
  { id:'oneword',  glyph:'☝️', label:'Exactly one word',      full:'Your answer must be EXACTLY one word.',
    check: a => (a||'').trim().split(/\s+/).filter(Boolean).length === 1 },
  { id:'long',     glyph:'📏', label:'Over 12 letters',        full:'Your answer must be MORE than 12 letters total.',
    check: a => tokens(a).join('').length > 12 },
  { id:'short',    glyph:'🤏', label:'Under 6 letters',        full:'Your answer must be LESS than 6 letters total.',
    check: a => { const n=tokens(a).join('').length; return n>0 && n<6 } },
  { id:'samestart',glyph:'🔠', label:'Same first letter',      full:'Every word must start with the SAME letter.',
    check: a => { const w=(a||'').trim().toLowerCase().split(/\s+/).filter(Boolean); return w.length>1 && w.every(x=>x[0]===w[0][0]) } },
  { id:'nopunct',  glyph:'∅',  label:'No punctuation',         full:'No punctuation whatsoever.',
    check: a => (a||'').trim().length>0 && !/[.,!?;:'"\\-—()]/.test(a||'') },
  { id:'actually', glyph:'🤓', label:'Start with "Actually,"', full:'Your answer must start with "Actually,".',
    check: a => /^actually,/i.test((a||'').trim()) },
  { id:'emdash',   glyph:'—',  label:'Exactly one em dash',    full:'Must contain exactly one em dash —',
    check: a => ((a||'').match(/—/g)||[]).length === 1 },
  { id:'hyphen',   glyph:'-',  label:'hyphen-between-words',   full:'A-hyphen-between-every-single-word.',
    check: a => (a||'').trim().length>0 && /\S-\S/.test(a||'') && !/\s/.test((a||'').trim()) },
  { id:'nodots',   glyph:'ı',  label:'No dots on i & j',       full:'j and i carry no dots (j → ȷ, i → ı).' },
  { id:'typo',     glyph:'✗',  label:'Contains a typo',        full:'Your answer must contain a spelling error.' },
  { id:'cipher',   glyph:'↪',  label:'A→B shift cipher',       full:'Shift every letter forward: A→B, B→C, C→D…' },
  { id:'bdswap',   glyph:'⇄',  label:'b and d swapped',        full:'b and d are swapped everywhere.' },
  { id:'wrong',    glyph:'🙃', label:'Factually wrong',        full:'Your answer must be factually WRONG.' },
  { id:'backwards',glyph:'⇋',  label:'Written backwards',      full:'Write the whole answer backwards.' },
  { id:'revwords', glyph:'🔁', label:'Each word reversed',     full:'Reverse each word, keep order (cat dog → tac god).' },
  { id:'altcaps',  glyph:'aA', label:'aLtErNaTiNg CaPs',       full:'tYpE lIkE tHiS — aLtErNaTiNg CaPs.' },
]

export const RULE = Object.fromEntries(RULES.map(r => [r.id, r]))

export const QUESTIONS = [
  'What is the best thing to eat at 3am?',
  'Describe your ideal morning routine.',
  'Pitch me a startup in one line.',
  "What's your hot take on pizza?",
  'How would you describe a sunset to an alien?',
  "What's the worst superpower to have?",
  'What would you do with one million dollars?',
  'What does happiness smell like?',
  'How do you explain the internet to a grandparent?',
  "What's a skill everyone should learn?",
  'If you could talk to one animal, which would it be?',
  'What would the title of your autobiography be?',
  'Describe the perfect vacation in three words.',
  "What's the most overrated food?",
  'How would you survive a zombie apocalypse?',
  'Describe the color blue without using the word blue.',
  "What's the most important invention of all time?",
  'If you could be any kitchen appliance, what would you be?',
  "What's your secret talent?",
  'If you had to eat one thing forever, what would it be?',
  "What's the first thing you'd do on Mars?",
  'How would you convince someone to try something new?',
  "What's your cure for a bad day?",
  'Describe your dream superpower.',
  "What's the weirdest thing you've ever eaten?",
]

export const PLAYER_COLORS = ['#F16147','#7184BE','#5A8A4A','#C9792E','#5A3A1F','#9B4DCA','#2E7D9B','#B5451B']
export const pColor = p => PLAYER_COLORS[(p.sort_order || 0) % PLAYER_COLORS.length]
