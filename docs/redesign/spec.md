# Le Flim — redesign spec for laclasseamericaine-leflim.fr

Design spec · 2026-11-22 · for kud/la-classe-americaine
Status: build-ready direction. The French site copy below is a first draft for a copy-editing pass; every quote, credit and fact carries a ✓ (attested by V1 or a source we reached, **not yet checked against the film**) or ◌ (uncertain or conflicting). Nothing here has been checked against the film itself; the build gate’s `verified: true` means exactly that, checked against the film or its end credits.

---

## 0. What exists, and what we start from

| Version | Where | Verdict |
| --- | --- | --- |
| **V1**, 2011 | branch `gh-pages` (Jekyll + jQuery, design by @usine_creative) | **The soul to keep.** It already had the two best ideas: George talking in a speech bubble every ten seconds, and a rotating fake press review (« The Magazine ★★★★ : Un flim pour les amateurs de ouiche lorraine… »). Its copy, its reviews and its fiche technique come back, rewritten. |
| **V2**, 2025 | `main` (= `new-version` + CVE fix + Dependabot), commits from `a93a33e` on | **Do not start from it.** Fourteen components, ~4,000 lines of shadcn cards, glitch text, "immersive gallery", animated background, keyboard-shortcut provider; a generic dark-amber template that could be any film. Worst of all, invented quotes (« Stun, stun, stun ! », « Nous étions des dieux ! », « Vengeance ! », « Tu veux ma photo ? ») appear in no source we found. Its accessibility report claims AAA without evidence. |
| **V2 revamp** | branch `feat/classe-americaine-revamp`, `a0c6b11`, **never merged** into `main` | Same base. Two ideas worth keeping in spirit only: the console easter egg and the self-aware dead button. Not a starting point either. |

**Build plan:** a fresh Next.js app on a new branch of `kud/la-classe-americaine` (unarchived 2026-11-22), replacing the tree wholesale; `gh-pages` stays as history. Reuse nothing from `src/`. Content data is rewritten from V1 and the verified lists below. It is a big-lane change: draft PR, Erwann's walk-through, Vercel preview.

---

## 1. The direction: « Affaire classée »

**One idea.** The site *is* the film's own device: a newsreel announces the death of the classiest man in the world, three journalists investigate his last words, witnesses speak in a dub that doesn't quite match their mouths, and the case ends stamped **CLASSÉE**. The pun (classe / classée) is the site's signature and its ending.

**Two rooms, one site.**
- **La salle de projection** (dark): the newsreel, the stills, the dub. Silver-screen black, film grain, title cards.
- **Le dossier** (paper): the inquiry file, typed notes, rubber stamps, the evidence (quotes), the credits. Warm newsprint paper, typewriter, one red stamp.

The page alternates between the two as you scroll, like the film cuts between the inquiry and the flashbacks. That alternation *is* the light/dark rhythm; system dark mode dims the paper to a projection-booth grey rather than inverting it (tokens in §6).

**The comedy rule.** Deadpan, timed, rare. The site never winks, never uses an exclamation mark the film didn't, never puts two jokes on screen at once. A gag is: a beat of silence, the line, a hold, an exit. Restraint is what makes « Monde de merde » land.

**Why this and not a generic "cinema" theme.** Every device on the page comes from the film's own grammar: the « Attention ! » card, the Citizen Kane newsreel, the inquiry, the flashbacks, the redub. Fans recognise it in two seconds; newcomers understand the film's mechanism by using the site.

---

## 2. Sitemap

| Route | Purpose |
| --- | --- |
| `/` | **L'Enquête**: one long page in eight chapters (§3). The site. |
| `/repliques` | Every quote, filterable by character; each one shareable. |
| `/repliques/[slug]` | One quote, big, with its still, character, scene, and a generated OG image. The page fans will actually share. |
| `/generique` | Full credits, dubbing cast, source films, sources, rights, colophon (history of the site since 2011). |
| `/voir` | Only if Erwann keeps it (decision 2): where to watch. |
| 404 | « Monde de merde. » (§4, interaction I-9) |

No other pages. V1's `docu` and `bonus` (Dailymotion embeds of the making-of and « Derrick contre Superman ») fold into chapter 6 as two links, checked live at build time; dead links are dropped, not shipped.

---

## 3. The home page, chapter by chapter

Copy is draft French, the film's misspellings kept on purpose (« flim », « cyclimse », « Tegzass », « Pétaire », « Stévaine »). Spelling: **George Abitbol** (V1 and the French Wikipedia; several quote sites write « Georges ») ◌ check the film's credits; pick one and use it everywhere.

### 0 · Le carton (first visit only)

Full-screen black card, white serif, centred, exactly as the film opens:

> **Attention !**
> ce flim n'est pas un flim sur le cyclimse.
> Merci de votre compréhension. ✓

Holds 3.2 s, then cuts (no fade) to chapter 1. Any key, click or tap skips. Shown once per browser (`localStorage`, wrapped in try/catch; without storage it simply shows every time). Reduced motion: same card, static, with a « Entrer » button. Never shown to crawlers (rendered client-side over the SSR page, so the content is indexed).

### 1 · Les Actualités (hero, dark)

The newsreel, Citizen Kane's « News on the March » in French. A title card, then the headline set like a 1950s newsreel bulletin.

- Kicker: « LES ACTUALITÉS — ÉDITION SPÉCIALE »
- Dateline: « Atoll de Pom Pom Galli, Ocean South Pacific » ✓ (the film's geography: « entre l'Australia et la South America »)
- H1: **« L'homme le plus classe du monde est mort. »** ✓
- Still: George Abitbol, black-and-white grade, slow 1.04 scale over 12 s (off under reduced motion). On phones the still comes first, cropped 16:9 above the headline, so the first screen shows a face, not only text.
- Dek: « George Abitbol s'est éteint au large de Pom Pom Galli. Ses derniers mots : » then a beat, then on its own line, large: **« Monde de merde. »** ✓
- Under it, small caps: « La Classe Américaine — Le Grand Détournement · un flim de Michel Hazanavicius et Dominique Mézerette · Canal+, 1993 » ✓
- One scroll cue: « Ouvrir l'enquête ↓ »

### 2 · La Rédaction (paper)

The editor gives the assignment. Typewritten memo on paper, with three stills pinned like ID photos.

> **NOTE DE SERVICE** — À : Dave, Peter, Steven. Objet : Abitbol, George.
> « Monde de merde. » Je veux savoir ce que ça veut dire.
> Dave, vous êtes sur le coup. Vous travaillerez avec Peter et Steven.

(paraphrases the line « Tu veux te mettre sur le coup mais tu travailleras avec Peter et Steven » ◌ exact wording)

Under each photo, a name and a pronunciation note, from the film's own insistence ✓:
- **Dave** (Paul Newman)
- **Peter** (Dustin Hoffman), prononcé « Pétaire », et non pas « Piteur »
- **Steven** (Robert Redford), prononcé « Stévaine », et non pas « Stiveun »

Then the reader is enrolled: « Et vous, vous êtes le quatrième. Prenez un carnet. » The rest of the page is the reader's inquiry.

### 3 · Les Témoins (dark)

Everyone who knew George « pendant sa vie au Texas (prononcé "Tegzass") » ✓. A horizontal row of witness cards on desktop, a vertical stack on phone. Each card: a still (faded-colour grade), the character name, « joué par » the original actor, « doublé par » the French voice ◌, and one line of deadpan file note. **Tapping or focusing a card makes the witness speak** (I-3). The cards:

| Character | Seen as (original actor) | French voice ◌ | File note (draft) |
| --- | --- | --- | --- |
| George Abitbol | John Wayne | Raymond Loyer (John Wayne's usual French voice) | « L'homme le plus classe du monde. Décédé. » |
| Dave | Paul Newman | ◌ (Patrick Guillemin per one source) | « Journaliste. Ne lâche jamais une piste, même mauvaise. » |
| Peter | Dustin Hoffman | ◌ | « Prononcé Pétaire. » |
| Steven | Robert Redford | ◌ (Patrick Guillemin per one source) | « Prononcé Stévaine. » |
| José | Burt Lancaster | Marc Cassot ✓ | « Ami de George. Coquet. Gastronome. » |
| Dino | Dean Martin | Joël Martineau ✓ | « Cow-boy. Ami intime de George. » |
| Frankie (or Francky ◌) | Frank Sinatra | ◌ | « A connu George. Préfère ne pas en parler. » |
| Le patron du journal | Jason Robards | Marc Cassot ✓ | « Veut savoir. » |
| Orson Welles | himself | Marc Cassot ✓ | « N'aime pas les voleurs et les fils de pute. » ✓ |

Cards are ordered as the inquiry meets them in the film ◌ (the builder takes the order from the film itself).

### 4 · Pièces à conviction (paper)

The quotes, presented as numbered evidence slips clipped into the file: « PIÈCE N° 7 », the line in large serif, then the speaker and scene in typewriter. Six on the home page, « Toutes les pièces → » to `/repliques`. Each slip has two actions: « Copier » and « Partager » (Web Share API, falls back to copying the `/repliques/[slug]` URL); on copy, a small red stamp « COPIÉ » lands on the slip (I-6).

**The quote bank** (all go to `content/quotes.ts` with a `verified` flag; the build fails if a quote marked `false` is published, see §9):

| # | Line | Speaker | Status |
| --- | --- | --- | --- |
| 1 | « Monde de merde. » | George Abitbol | ✓ |
| 2 | « Attention ! ce flim n'est pas un flim sur le cyclimse. Merci de votre compréhension. » | opening card | ✓ |
| 3 | « L'homme le plus classe du monde. » | the newsreel | ✓ |
| 4 | « Le train de tes injures roule sur le rail de mon indifférence. » | George ◌ | ✓ line, ◌ speaker |
| 5 | « Je préfère partir plutôt que d'entendre ça plutôt que d'être sourd. » | George ◌ | ✓ line, ◌ speaker |
| 6 | « Tu fais un amalgame entre la coquetterie et la classe. » | George, to José | ✓ (wording ◌) |
| 7 | « Ah, voilà enfin le roi de la classe ! » | José, greeting George | ✓ (rest of the line ◌) |
| 8 | « Écoute-moi bien mon petit José, tu baises les ménagères ? … » | George, to José | ✓ (V1 has « Tu baises les ménagères ? c'est bien, tu dois avoir le cul qui brille ! ») |
| 9 | « Blablabla, j'ai les bonbons qui collent au papier. » | ◌ | ✓ line |
| 10 | « Vous savez ce que vous mangez, là ? Madame Felipe, la patronne, se coupe les morceaux de nichon pour en faire des ravioles. » | George ◌ | ✓ (one source attributes the ravioles line to George) |
| 11 | « Tes excuses tu peux te les coller au cul, tout comme ton bifteck… » | ◌ | from V1 ◌ |
| 12 | « C'est ça, la puissance intellectuelle !… bac+2, les enfants ! » | ◌ | from V1 ◌ |
| 13 | « Moi ce que je vois, c'est que dans deux secondes je vais te botter le cul. » | ◌ | from V1 ◌ |
| 14 | « Eh, tu sais à qui tu parles, là ? » | ◌ | from V1 ◌ |
| 15 | « Tiens regarde ! Les Anglais ont débarqué. On va être obligé de passer par derrière… » | ◌ | from V1 ◌ |
| 16 | the doorbell « dring » and its special effects | Peter ◌ | ✓ gag, wording ◌ |
| 17 | Yves who « envoie son gorille » | Steven ◌ | ✓ gag, wording ◌ |
| 18 | « Pas mal, non ? C'est français. » | ◌ | widely memed as from the film ◌ |
| 19 | « Les voleurs et les fils de pute », Welles on what he doesn't like | Orson Welles | ✓ (V1 synopsis) |

**Banned:** every V2 line not in this table (« Stun, stun, stun ! », « Nous étions des dieux ! », « Vengeance ! », « Tu veux ma photo ? », « J'aurais dû être écrivain. », « C'est moi le plus classe ! », « Comment qu'on dit déjà ? »). Also anything from *OSS 117*, the same director's later films, which fans will catch at once. The final wording gets a copy-editing pass.

### 5 · La critique est unanime (dark)

V1's best joke, back: one review at a time, a stars rating, the outlet, in the style of a poster pull-quote. Rotates every 7 s (I-5).

| Outlet | Stars | Review |
| --- | --- | --- |
| The Magazine | ★★★★ | « Un flim pour les amateurs de ouiche lorraine et autres animaux préhistoriques partouzeurs de droite. » |
| Wogue | ★★★★★ | « Cultissime ! La définition même de la classe ! » |
| AlloFlim | ★★★★ | « Prodigieusement drôle et vivant ! À découvrir avec les copains autour d'un bon paquet de chips. » |
| Humour de droite | ★ | « J'ai rien compris. » |
| Mexican Food Restaurant | ★ | « Des acteurs époustouflants ! » |
| Mouvement du jour | ★ | « Erreur 403. » |

These are V1's invented reviews (2011), clearly parody; a small footnote says « Critiques imaginaires, depuis 2011. » so nobody quotes them as real.

### 6 · Le Grand Détournement (paper): how it was made

Short, factual, the part newcomers need. Draft:

> En 1993, pour les 70 ans de la Warner ◌ (one source says centenary; use « anniversaire » if unresolved), le studio ouvre son catalogue à Canal+. Michel Hazanavicius et Dominique Mézerette y piochent des extraits d'une cinquantaine de films tournés entre 1952 et 1980 ✓, un fragment de *Maigret* avec Bruno Cremer ✓, et font tout redoubler par les voix françaises habituelles des stars ✓ (seize comédiens ◌), dont Raymond Loyer, la voix de John Wayne. Ils en tirent un flim neuf : un hommage à *Citizen Kane* ✓.
>
> Diffusé une seule fois sur Canal+, le 31 décembre 1993 ✓. Les droits ne permettent pas d'autre diffusion télévisée ◌. Le flim survit en VHS copiées entre amis ✓, puis sur internet. Rediffusé sur Festival en 2004 ✓ (contradicts "only once": the copy says « une seule fois sur Canal+ »). Projeté au Centre Pompidou le 11 avril 2009, au festival Hors Pistes, en présence des deux auteurs ✓.

Then **« Les films détournés »**: a strip of title cards, each a source film with year, set as a film-can label. Confirmed in sources ✓: *All the President's Men* (Les Hommes du président), *Rio Bravo*, *Band of Angels*, *The Cheyenne Social Club*, *Blood Alley*, *Bullitt*, *The Candidate*, *Chisum*, *The Cowboys*, *The Crimson Pirate*, *When Time Ran Out*; others ◌ until checked against a complete list (the French Wikipedia list is the reference; it was unreachable from this session). Two links if alive: the making-of documentary, and « Derrick contre Superman », the authors' earlier détournement ◌.

### 7 · Affaire classée (dark → paper)

The ending, Citizen-Kane style, without spoiling the film: the inquiry board, the three journalists' stills, a red thread, and the question « Monde de merde : qu'a-t-il voulu dire ? ». On scroll into view the red stamp **CLASSÉE** lands across the file (I-7). Under it:

> L'enquête est close. Pour la réponse, il faut voir le flim.

Two calls to action: « Toutes les répliques » and « Le générique ».

### 8 · Footer (paper)

« La Classe Américaine — Le Grand Détournement (1993). © Warner Bros., Canal+. Site hommage non officiel, fait par des fans. » Link to `/generique`. A tiny line, in the footer only: « Ce site n'est pas un site sur le cyclimse. » (I-8 lives here).

---

## 4. Interaction catalogue

One rule above all: **never more than one talking thing on screen.** A global "stage" queue serialises I-2, I-3 and I-4; anything that arrives while something is on stage is dropped, not queued.

| Id | Name | Trigger | Timing | Reduced motion | Notes |
| --- | --- | --- | --- | --- | --- |
| I-1 | Le carton | first visit | hold 3.2 s, hard cut out; skip on any input | static card + « Entrer » | §3.0 |
| I-2 | **Le Doublage** (« des gens qui parlent ») | (a) a chapter first scrolls 40% into view, once per chapter; (b) idle 25 s, at most 3 per visit, 60 s apart; (c) hover 600 ms or focus/tap on a witness card | see below | no slide, no typing: appears and disappears with a 150 ms opacity change; line shown whole | the core device |
| I-3 | Témoin parle | tap/click/Enter on a witness card | same as I-2, that character's pool | same | the user-driven version of I-2 |
| I-4 | Le projectionniste | idle 90 s on the page | a single title card slides up from the bottom: « Entracte. » with a tiny « Reprendre » | static | once per visit, only if I-2 hasn't run in 60 s |
| I-5 | La critique | in view | crossfade 400 ms every 7 s; pauses on hover/focus and when off-screen; prev/next buttons | no auto-rotation, all six listed | `aria-live="off"` while rotating (no chatter for screen readers) |
| I-6 | Tampon « COPIÉ » | copy/share a quote | stamp scales 1.6 → 1, rotates −8°, 180 ms, `ease-out`; a 1px shake of the slip | instant stamp | haptic `navigator.vibrate(10)` where supported |
| I-7 | Affaire classée | chapter 7 at 50% in view | stamp drops 220 ms, then the paper "settles" 2px | instant | once |
| I-8 | Le cyclimse | typing « cyclimse » anywhere (not in a field), or clicking the footer line | replays I-1 | static card | a fan's reward |
| I-9 | La 404 | unknown route | see §4.2 | static | |
| I-10 | La console | devtools opened (just log on load) | — | — | `console.log` of the opening card, styled, then « L'homme le plus classe du monde vous regarde lire la console. » |
| I-11 | Prononciation | hover/focus on « Peter » or « Steven » wherever they appear in the copy | a tooltip, 0 ms delay on focus, 300 ms on hover: « prononcé Pétaire » | same | small, the kind of thing a fan smiles at |

### 4.1 Le Doublage, in detail

This is the "people who talk" mechanism, and it borrows the film's joke: **the line arrives a beat after the mouth.**

1. A framed still of the character slides in from the nearest edge (left on desktop, bottom on phone), 260 ms, `cubic-bezier(.2,.8,.2,1)`. No bounce. The frame is a small 4:5 film-frame with sprocket holes on one side.
2. **Silence, 450 ms.** This is the joke's beat. A tiny « VF » tag blinks once in the frame corner.
3. The line appears as a **film subtitle**: white serif text with a black outline, under the frame, revealed word by word at 55 ms per word (not letter-typing, which feels like a chatbot).
4. Hold: 1.2 s + 60 ms per word, capped at 6 s.
5. Exit: slides out the way it came, 200 ms.
6. Dismiss with ✕, Escape, or a tap anywhere outside. Hover/focus on the bubble pauses the hold.

Content: each character has a pool (`content/lines.ts`, verified quotes only); no repeats until the pool is exhausted; the chapter triggers use the chapter's natural speaker (chapter 2 → le patron, chapter 4 → George, chapter 6 → Orson Welles).

Accessibility: the bubble is a `role="status"` region (`aria-live="polite"`), so a screen reader hears « George Abitbol : Monde de merde. » once; never steals focus; the ✕ has a 44 px target. Automatic triggers (a, b) can be turned off with one toggle in the footer, « Les témoins se taisent », remembered per browser. Under `prefers-reduced-motion`, automatic triggers (b) are off by default.

Phone: the frame docks above the bottom safe-area inset, full width minus 16 px gutters, never covering the chapter's heading (it docks at the top if the heading is in the bottom third). Max one automatic appearance per 45 s on phones.

### 4.2 The 404

Full-screen projection room. A newsreel card: « ERREUR 404 — PAGE INTROUVABLE ». A beat (600 ms), then George's still slides in and says, as subtitle: **« Monde de merde. »** Then one button: « Retourner à l'enquête ». The page title is « Monde de merde · La Classe Américaine ». Status code stays a real 404.

---

## 5. Motion and sound rules

**Motion is film grammar, nothing else.** Allowed: the hard cut, the fade to black, the iris (circle wipe, used once: opening the inquiry from the hero), the horizontal wipe between chapters on desktop, the slow push-in on stills, the rubber stamp. Forbidden: springs with overshoot, parallax on text, glitch, typing of whole paragraphs, scroll-jacking, anything that moves while the user is reading body copy.

- Durations: 150–260 ms for UI, 400 ms crossfades, 12 s for push-ins. Easing `cubic-bezier(.2,.8,.2,1)` for entries, `ease-in` for exits.
- Grain: a static SVG noise overlay at 4% on dark chapters; it does not animate (animated grain costs battery and reads as a template). The opening card alone gets a 1.2 s flicker.
- `prefers-reduced-motion: reduce`: every movement becomes an opacity change of ≤150 ms; push-ins off; auto-rotation off; idle triggers off.
- Performance budget: LCP under 2.0 s on a mid phone; JS under 90 KB gzip for the home page; motion runs on `transform`/`opacity` only.

**Sound is opt-in, and it is ours.** Off by default; a small switch top-right, « Son : coupé / Son : projecteur ». No film audio, no voice clips (the voices are the work itself, and a fan site that autoplays them is the thing people close). When on: a soft projector whirr under the newsreel (−30 dB, looping, stops when the hero leaves view), a typewriter tick on the memo, a stamp thud on I-6 and I-7. All three are **synthesised with the Web Audio API** (filtered noise, a short click, a low thump): zero audio files, zero licensing. Respects the OS mute; never plays before a user gesture.

---

## 6. Visual system

### Type
- **Display: Bodoni Moda** (Google Fonts, variable, optical size axis): newsreel headlines, the big quotes, title cards. High-contrast didone, the 1950s Hollywood title card without pastiche. Set tight (−0.01em), never in all caps above 40 px except title cards.
- **Typewriter: Courier Prime** (Google Fonts): the dossier, memos, file notes, stamps' labels, metadata. The inquiry's voice.
- Two families, no third. Subtitles use Bodoni Moda italic, white with a 2 px black text stroke (`paint-order: stroke`), like a 35 mm subtitle.
- Scale (fluid, `clamp`): 13 / 15 / 17 (body, Courier at 16–17 px is generous on purpose) / 22 / 32 / 48 / 72 / 112.

### Palette (tokens)
| Token | Light (dossier) | Dark mode | Use |
| --- | --- | --- | --- |
| `--paper` | `#EFE8DA` | `#2A2723` | dossier chapters |
| `--ink` | `#1B1814` | `#ECE5D6` | text on paper |
| `--screen` | `#0E0D0C` | `#0A0908` | projection chapters |
| `--silver` | `#E4DED2` | `#DDD6C8` | text on screen |
| `--silver-dim` | `#9E978A` | `#8D8679` | captions, credits (still ≥ 4.5:1 on `--screen`) |
| `--stamp` | `#B3261E` | `#E0483D` | the one accent: stamps, the red thread, focus rings on paper |
| `--rule` | `#1B181433` | `#ECE5D633` | hairlines |

Colour never carries meaning alone: stamps always have a word, the red thread is decorative. Focus ring: 3 px `--stamp` on paper, 3 px `--silver` on screen, 2 px offset.

### Layout
- 12-column grid at ≥ 1024 px, max 1200 px; single column on phones, 16 px gutters, no horizontal page scroll (the witness row scrolls inside its own container with scroll-snap and visible buttons).
- Each chapter is at least one viewport tall on desktop, natural height on phones.
- Stills are always framed (thin silver border + sprocket edge for "frames", a pinned photo with a paper clip for the dossier).

---

## 7. Images: the pipeline

Erwann confirmed (2026-11-22) that film images may be used for this project. Stills carry the comedy and the newsreel; the commissioned illustrations are the identity and the few places a drawing is funnier (§8).

**Source.** Frames grabbed from the film itself, at listed timecodes, by one script. The file is the open question (decision 1): V1/V2 linked an archive.org copy and a Vimeo upload, which may be gone or low-resolution. The repo's existing `public/` stills (George 760×840, Dave/Peter/Steven composites 374×528, a 1080×195 header) are too small for anything above thumbnails; they serve the concept only.

**`content/stills.ts`** declares each still once:
```ts
{ id: "george-hero", timecode: "00:03:12.400", crop: { aspect: "4:5", focus: [0.5, 0.3] },
  grade: "actualites", alt: "George Abitbol, chapeau de cow-boy et étoile de shérif, regarde l'objectif sans sourire.",
  character: "george", scene: "Le journal filmé" }
```

**`scripts/stills.mjs`** (Node, one command: `npm run stills -- <film-file>`):
1. `ffmpeg -ss <timecode> -i <film> -frames:v 1` → lossless PNG per still.
2. `sharp`: crop to the aspect around the focus point; upscale ≤ 2× only with a Lanczos filter (no AI upscaling: it invents faces).
3. Grade, two looks only: **`actualites`** = greyscale, contrast 1.15, lifted blacks to `#141210` (newsreel, hero, 404); **`temoignage`** = saturation 0.55, a warm 6% tint, slight fade (witnesses, evidence). Grain is added in CSS, not baked in.
4. Export AVIF (q 50) and WebP (q 72) at 480 / 960 / 1600 w into `public/stills/`, plus a 16 px blurred placeholder inlined in `stills.ts`. Budget: hero ≤ 120 KB AVIF at 1600 w, cards ≤ 30 KB.
5. Writes `stills.generated.json` (sizes, placeholder); never hand-edited.

Displayed with `next/image` (`sizes` set per slot). The PNG masters are not committed; the film file never is.

**Alt text:** French, describes who and what's happening as a deadpan witness statement, not "image de…". Decorative frames get `alt=""`.

**Credit:** every still carries `data-credit`; a visible caption on hover/focus in the dossier chapters (« Image : La Classe Américaine, 1993 · © Warner Bros., Canal+ »), and the full list on `/generique` (still → source film when known ◌).

**OG images:** generated with `next/og` at build: 1200×630, the quote in Bodoni Moda on `--screen`, the character's still at the right in the `actualites` grade, the wordmark bottom-left. The home page's OG is the commissioned one (§8).

---

## 8. Commissioned assets

Two briefs, sent one after the other : identity first, spot illustrations second. Delivered as a PR on `kud/la-classe-americaine` under `public/brand/`. There is no brand card for this product yet; the illustrator starts one from what lands.

1. **Wordmark « Le Flim »** with the line « La Classe Américaine · hommage » (SVG, one colour, works on `--screen` and `--paper`).
2. **Mark / favicon**: a monogram or emblem that survives 16 px (SVG + 512 PNG + maskable icon full-bleed).
3. **Home OG image** 1200×630.
4. **The newsreel emblem** for chapter 1's title card (the site's « Actualités » ident).
5. **Spot illustrations** where a drawing beats a still: the crossed-out bicycle (« pas un flim sur le cyclimse », carton and footer), the bow-tied globe for the 404 (« Monde de merde »), the « CLASSÉE » rubber stamp, the « COPIÉ » stamp.

No drawn character portraits for now: the stills do that better and the dub joke depends on real faces. Revisit only if a scene needs a character the stills can't give.

---

## 9. Stack and build

- **Next.js 16** (App Router, all routes static), **React 19**, **motion** (`motion/react`) for the Doublage and stamps only; CSS for the rest. **No Tailwind, no shadcn**: one `tokens.css` and CSS Modules; the V2 component zoo is what we're leaving.
- `next/font/google`: Bodoni Moda, Courier Prime (subset latin + latin-ext, `display: swap`).
- Content as typed TS: `content/quotes.ts`, `characters.ts`, `lines.ts`, `reviews.ts`, `films.ts`, `credits.ts`, `stills.ts`. A test fails the build if a published quote or credit has `verified: false`; `verified` means checked against the film or its end credits, not merely ✓ in this spec.
- The stage queue (I-2..I-4) as a pure scheduler module (`lib/stage.ts`) with unit tests (Vitest): one-at-a-time, idle caps, reduced-motion behaviour, no repeats.
- `next/og` for OG images; `sitemap.ts`, `robots.ts`; `lang="fr"`.
- No analytics cookies; Vercel Web Analytics (cookieless) if Erwann wants numbers. V1's Google Analytics is not carried over.
- Vercel, domain `laclasseamericaine-leflim.fr` (already pointed, ◌ check), preview per PR.
- Checks before the PR leaves draft: build, Vitest, `axe` on `/`, `/repliques`, `/generique`, the 404; Lighthouse mobile ≥ 95 perf/a11y; manual pass at 390 px and 1280 px, both colour schemes, reduced motion on.

Nothing here is unusual for Next.js. If the stills script needs `ffmpeg` in CI, it doesn't: stills are generated locally and committed as AVIF/WebP.

---

## 10. `/generique`: credits and rights

The page fans will check. Draft structure:

**La Classe Américaine — Le Grand Détournement** (1993)
Un flim de **Michel Hazanavicius** et **Dominique Mézerette** ✓
- Scénario : Michel Hazanavicius, Dominique Mézerette ✓
- Montage : Jean-Michel Kuess, Guy Rondi ✓ (V1)
- Musique : Laurent Petitgirard ✓ (V1)
- Production : Ève Vercel, Robert Nador, Michel Lecourt ✓ (V1) · Dune, Canal+ ✓
- Durée : 72 min ◌ (V1 says 72; one source says ~80) · Première diffusion : Canal+, 31 décembre 1993 ✓

**Les voix** ◌ (whole list to check against the film's end credits; mappings conflict between sources):
Raymond Loyer (George Abitbol, récitant) · Marc Cassot (José, Yves, Orson Welles, le patron du journal…) · Patrick Guillemin (Steven / Dave ◌) · Joël Martineau (Dino) · Christine Delaroche · Évelyne Grandjean · Jean-Claude Montalban · Roger Rudel · Jean-Éric Bielle · Marc François · Lionel Abelanski · Dominique Farrugia · Alain Chabat · Jean-Yves Lafesse · Michel Hazanavicius · Serge Hazanavicius.

**À l'écran** (archives Warner Bros.): John Wayne, Paul Newman, Dustin Hoffman, Robert Redford, Burt Lancaster, Dean Martin, Frank Sinatra, Jason Robards, Orson Welles ✓, and many more ◌.

**Les films détournés**: the list from §3.6.

**Droits**
> La Classe Américaine — Le Grand Détournement © Warner Bros., Canal+. Images et répliques extraites du flim, utilisées à titre d'hommage. Ce site est un hommage non officiel, sans but commercial, fait par des fans ; il n'est affilié ni à Warner Bros., ni à Canal+, ni aux auteurs. Ayants droit : une demande de retrait est traitée sans discussion, [contact].

**Colophon**
« Ce site existe depuis 2011. Première version : @_kud, design @usine_creative. Refait en 2026. » Fonts, the fact that the sounds are synthesised, and the sources used for facts (French Wikipedia, Wikiquote, TMDB, fan collections), each linked.

---

## 11. Decisions only Erwann can make

1. **The film file for the stills.** Who supplies it, and which copy (the better the source, the better every image on the site). Until then the build uses the repo's small existing stills as placeholders.
2. **Watch / download.** V1 and V2 offered « Regarde le » and « Télécharge le » (Vimeo, archive.org). Recommendation: no hosting, no download button; at most one « Où voir le flim » link on `/generique` if a working public copy exists at build time. His call, since it is the one place the site could be read as distributing the film.

Everything else in this spec is decided; carte blanche taken.

---

## 12. Research notes

Sources reached (search summaries only): TMDB cast, SensCritique, AlloCiné, FilmDeCulte, Ciné-club de Caen, rueducinema, 10h26, Joke Me, choisirunfilm, Ouest-France citations, meme.com, wikiland (a French Wikipedia mirror). **Unreachable from this session** (blocked by the network allowlist): fr.wikipedia.org, en.wikipedia.org, slate.fr, citation-celebre.com, cyclim.se (a fan site with a full dubbing page). The ◌ items above are exactly what those pages would settle; a pass with them reachable, or with the film's end credits, closes them.
