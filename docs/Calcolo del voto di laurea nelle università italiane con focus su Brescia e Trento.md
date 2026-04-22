# Calcolo del voto di laurea nelle università italiane con focus su Brescia e Trento

## Executive summary

Il voto di laurea in Italia è espresso in centodecimi e viene quasi sempre ottenuto convertendo una media degli esami in trentesimi e aggiungendo una serie di punti bonus legati a carriera, tesi ed eventuali esperienze extra-curriculari.[^1][^2]
Ogni ateneo e spesso ogni dipartimento adotta però un proprio regolamento di calcolo, definito nei regolamenti di prova finale o nei regolamenti didattici di corso di studio.[^3][^4]

Questo report descrive un modello astratto riutilizzabile per un calcolatore generico di voto di laurea e documenta in dettaglio i criteri di calcolo per alcuni insiemi di corsi dell’Università di Brescia (UniBS) e dell’Università di Trento (UniTrento), che possono essere codificati come “preset” specifici.

## Struttura generale del calcolo del voto di laurea

### Pattern comuni negli atenei italiani

Dai regolamenti analizzati emergono alcuni pattern ricorrenti:

- **Base = media degli esami**: la base del voto è quasi sempre la media (semplice o ponderata sui CFU) dei voti degli esami espressi in trentesimi, con il trattamento specifico di “30 e lode” (es. contato come 30 oppure 31).[^2][^4][^1]
- **Conversione in centodecimi**: la media in trentesimi viene convertita in centodecimi moltiplicando per un fattore (tipicamente \(110/30\), approssimato in alcuni regolamenti come 11/3 o 3,85) oppure con una formula equivalente.[^4][^5][^1]
- **Punti aggiuntivi (bonus)**: alla base convertita si sommano punteggi extra legati a tesi, durata degli studi, lodi, mobilità internazionale, progress test o altri elementi di carriera.[^6][^7][^8]
- **Arrotondamenti e lode**: il punteggio finale viene arrotondato all’intero più vicino e, se raggiunge almeno 110/110 e sono soddisfatte ulteriori condizioni (es. unanimità della commissione), può essere attribuita la lode.[^5][^8][^6][^4]

### Modello astratto per un calcolatore generico

Un modello astratto applicabile alla maggior parte dei corsi può essere strutturato così:

1. **Calcolo della media**  
   - Input: elenco esami con voti in trentesimi, CFU, flag “sovrannumerario”, flag “idoneità”, eventuale esame di prova finale.  
   - Parametri per corso di laurea:
     - `include_thesis_in_average: boolean` (es. sì per alcuni corsi UniTrento DII L9, no per DISI triennali).[^4][^5]
     - `weight_by_credits: boolean` (es. vero quasi ovunque; esplicitato per molti corsi di ingegneria UniBS).[^2][^6]
     - `lode_numeric_value: 30 | 31` (31 per diversi corsi UniTrento).[^4][^5]  

2. **Conversione in centodecimi**  
   - Parametro: `conversion_factor` o formula equivalente.
   - Esempi reali:
     - Fattore \(11/3\) per i corsi DISI triennali UniTrento.[^4]
     - Fattore 3,85 per Ingegneria Industriale (L9) e lauree magistrali DII UniTrento.[^9][^5]
     - “Conversione in centodecimi” senza fattore specificato (si può assumere \(110/30\) se non diversamente precisato) per vari corsi UniBS.[^7][^6][^2]

3. **Componenti di bonus**  
   Ogni regolamento definisce un set di componenti, ciascuna con massimo assegnabile e regole di calcolo.

   Esempio di schema astratto:

   ```ts
   type BonusComponent = {
     id: string; // es. "thesis", "duration", "honours", "mobility", "progress_test"
     description: string;
     maxPoints: number;
     mode: 'discrete-table' | 'numeric-formula' | 'manual-by-commission';
     // opzionale: struttura parametricamente definita
   };

   type GraduationRule = {
     baseScale: 30 | 110;
     useWeightedAverage: boolean;
     includeThesisInAverage: boolean;
     lodeNumericValue: 30 | 31;
     conversionFactor: number; // o funzione custom
     rounding: 'nearest' | 'floor' | 'ceil';
     bonusComponents: BonusComponent[];
     honoursRule: {
       minFinalBeforeHonours: number;
       extraConditions?: string; // es. unanimità commissione, soglia di media
     };
   };
   ```

4. **Decisione sulla lode**  
   - Parametri per corso di laurea:
     - `minFinalBeforeHonours` (es. 110 per molti corsi UniBS e DII UniTrento; 111 per DISI e L9 UniTrento).[^8][^6][^5][^9][^4]
     - `requires_unanimity: boolean` (quasi sempre vero).[^6][^7][^9][^8]
     - Eventuali ulteriori condizioni (es. numero minimo di lodi, soglia sulla media).

Questo modello consente di implementare un calcolatore generico “media + bonus” e di definire per ogni corso dei preset che istanziano i parametri e descrivono le componenti di bonus.

## Università di Brescia (UniBS)

### Panorama generale

Per l’Università di Brescia il calcolo del voto di laurea è disciplinato principalmente da regolamenti di prova finale di dipartimento/CCSA (per i corsi di ingegneria) e da regolamenti didattici specifici per i corsi a ciclo unico come Medicina e Chirurgia.[^3][^7][^8][^6]
In generale, UniBS utilizza la media ponderata sugli esami in trentesimi, la converte in centodecimi e consente alla commissione di aggiungere un numero limitato di punti bonus per carriera, tesi ed esposizione, talvolta con distinzioni fra tesi compilative e di ricerca.[^7][^8][^2][^6]

### Ingegneria dell’Informazione (DII) – lauree triennali

Regolamento: “Regolamento per lo svolgimento della prova finale e valutazione conclusiva per i corsi di laurea afferenti al Dipartimento di Ingegneria dell’Informazione” (vale per tutte le triennali DII: ingegneria informatica, elettronica, ecc.).[^6]

**Base:**

- La votazione di base si ottiene dalla **conversione in centodecimi della media ponderata** (per CFU) dei voti registrati per le attività curriculari.[^6]
- Sono esclusi dal calcolo i CFU riconosciuti senza voto e gli esami soprannumerari, salvo diversa indicazione nei singoli ordinamenti.[^6]

**Bonus:**

- La commissione può aggiungere un **incremento massimo di 7 punti** sulla base di tre componenti:[^6]
  - **Carriera di studi** (esperienze all’estero, numero di lodi, premi e riconoscimenti): fino a 2 punti.[^6]
  - **Giudizio del relatore e qualità del lavoro di tesi**, capacità di esposizione e discussione: fino a 4 punti.[^6]
  - **Laurea in corso** (conclusione degli studi nei tempi normali): 1 punto.[^6]

**Arrotondamenti e lode:**

- Se il punteggio complessivo (base + bonus) è **minore di 110**, il voto di laurea è l’arrotondamento all’intero più vicino.[^6]
- Se il punteggio è **maggiore o uguale a 110**, il voto viene fissato a 110/110; la lode può essere attribuita **all’unanimità** quando il punteggio arrotondato all’intero più vicino è maggiore di 110.[^6]

**Preset tipico DII (triennale):**

- `baseScale = 30`, `useWeightedAverage = true`, `includeThesisInAverage = false`, `lodeNumericValue = 30` (non specificato diversamente).  
- `conversionFactor = 110/30` (conversione standard).  
- Bonus components:
  - `career`: max 2, discrezionale su lodi/estero/premi.  
  - `thesis`: max 4 (qualità + presentazione).  
  - `duration`: max 1 (laurea in corso).  
- `honoursRule`: `minFinalBeforeHonours = 110`, `requires_unanimity = true`.

### Ingegneria Civile e Ambientale – CCSA di Ingegneria Civile e Ambientale

Regolamento: “Regolamento delle prove finali per i corsi di laurea afferenti al CCSA di Ingegneria Civile e Ambientale” (2024).[^7]

**Base:**

- Voto finale espresso in centodecimi; la prima componente è la **conversione in centodecimi della media dei voti degli esami di profitto**.[^7]
- La media è arrotondata all’unità; in caso di parte decimale 0,5 si arrotonda all’intero superiore.[^7]

**Bonus:**

- La votazione finale è somma di:
  - **Base** (media convertita e arrotondata).[^7]
  - **Incremento fino a 3 punti** derivante dalla carriera complessiva, includendo elementi come:[^7]
    - laurea in corso;  
    - numero di lodi;  
    - stage extra-curricolari non connessi alla tesi.  
  - **Incremento fino a 3 punti** per la **qualità dell’elaborato** su proposta del relatore.[^7]
  - **Incremento fino a 4 punti** per la **qualità dell’esposizione e maturità mostrata** durante la discussione.[^7]

**Lode:**

- La lode può essere attribuita se la votazione finale è almeno 110/110 ed è proposta dal relatore e approvata **all’unanimità**.[^7]

**Preset tipico CCSA Ingegneria Civile/Ambientale:**

- Struttura molto simile a DII, ma con **scala di bonus diversa** (3 + 3 + 4) invece del singolo tetto 7 e con regole più dettagliate per le singole componenti.[^7]

### Ingegneria (regolamento storico di Facoltà 2005 – triennali ord. 509)

Per le vecchie lauree triennali in Ingegneria (ordinamento 509) esiste un regolamento di Facoltà che definisce un modello ancora usato come base concettuale in diversi corsi.[^2]

- **Base:** conversione in centodecimi della media ponderata (per CFU) delle votazioni degli esami di profitto; esclusi crediti senza voto e esami sovrannumerari.[^2]
- **Bonus standard:** incremento massimo di **7 punti** attribuibile dalla commissione in base a carriera, tesi e discussione.[^2]
- **Bonus eccezionale:** ulteriore incremento fino a **3 punti** attribuibile solo all’unanimità per “particolari motivazioni” legate alla carriera complessiva.[^2]
- **Lode:** attribuita all’unanimità quando il punteggio finale giustifica un apprezzamento particolare.[^2]

### Medicina e Chirurgia – LM‑41 (ciclo unico)

Per Medicina e Chirurgia UniBS utilizza un modello più articolato, basato su una **media non ponderata**, lodi, progress test, durata degli studi, mobilità internazionale e punteggio per la tesi.[^10][^8]

Dal regolamento didattico coorte 2023/24 (Art. 18 – Prova finale) si ricava:[^8]

**Componente A – Media e lodi**

- **a1 – media aritmetica** degli esami di profitto espressa in centodecimi (non ponderata sui CFU).[^8]
- **a2 – lodi**: 0,2 punti per ogni lode, fino a un massimo di **2 punti**.[^8]
- In alcune versioni precedenti è presente anche **a3 – progress test**, pari a 0,4 punti per ogni progress test sopra la media della coorte (dal 2° al 6° anno), fino a **2 punti**; questa voce può essere mantenuta parametrica perché la presenza o meno dipende dalla coorte/anno accademico.[^10]
- Il punteggio derivante da A viene arrotondato all’intero più vicino.[^10][^8]

**Componente B – Durata degli studi e mobilità**

- **b1 – durata del corso**:  
  - 2 punti se ci si laurea entro 6 anni.  
  - 1 punto se ci si laurea entro 7 anni.[^8]
- **b2 – mobilità internazionale**: 0,2 punti per ogni mese di partecipazione a programmi di scambio approvati (es. Erasmus), fino a un massimo di **2 punti**.[^8]

**Componente C – Tesi**

- Punteggio proposto in seduta di laurea, differenziato tra tesi di ricerca e tesi compilativa:[^8]
  - Tesi di ricerca: massimo **9 punti** (0–5 qualità tesi, 0–4 presentazione/discussione).[^8]
  - Tesi compilativa: massimo **5 punti** (0–1 qualità tesi, 0–4 presentazione/discussione).[^8]

**Voto finale e lode**

- Voto di laurea = somma delle componenti **A + B + C**, con arrotondamenti intermedi come da regolamento.[^10][^8]
- La **lode** è attribuita con **parere unanime** della commissione e al raggiungimento di una soglia minima (es. almeno 100 punti considerando media + lodi) esplicitata nel regolamento.[^10][^8]

**Preset Medicina UniBS:**

- `baseScale = 110`, `useWeightedAverage = false`, `includeThesisInAverage = false`.  
- Bonus components:
  - `honours`: lodi sugli esami (max 2 pt).  
  - `progress_test`: opzionale, max 2 pt (coorte-dipendente).  
  - `duration`: max 2 pt.  
  - `mobility`: max 2 pt (0,2 pt/mese).  
  - `thesis`: max 9 o 5 a seconda della tipologia.

### Giurisprudenza – LMG/01 (ciclo unico)

Per il corso di laurea magistrale a ciclo unico in Giurisprudenza il regolamento didattico rinvia, per la prova finale e la quantificazione del voto di laurea, a un **apposito regolamento di prova finale**.[^11][^12]
Lo stesso regolamento prevede che lo stage possa essere preso in considerazione, “a discrezione della commissione di laurea”, ai fini della quantificazione del voto di laurea.[^11]

Non è stato però individuato nelle fonti consultate un documento separato che espliciti in modo numerico il tetto di punti e la ripartizione dettagliata fra media, tesi, lodi e stage, per cui è opportuno modellare Giurisprudenza UniBS nel calcolatore come corso con **regola non completamente nota**, consentendo l’inserimento manuale dei parametri o rimandando a un futuro scraping del relativo regolamento di prova finale.[^12][^11]

## Università di Trento (UniTrento)

### Panorama generale

UniTrento adotta, per vari corsi di Ingegneria, una struttura molto esplicita del calcolo, spesso articolata in quattro passi: media, conversione, punti aggiuntivi, regola per la lode.[^5][^9][^4]
Sono pubblicati allegati specifici nei regolamenti di prova finale che esplicitano i fattori di conversione e le formule per i punti aggiuntivi, facilitando la codifica in un calcolatore.[^9][^5][^4]

### DISI – Corsi di laurea triennali (Ingegneria e Scienza dell’Informazione)

Regolamento: “Regolamento prova finale e conferimento del titolo dei corsi di laurea del Dipartimento di Ingegneria e Scienza dell’Informazione” (DR 1334/2025), con Allegato 1 “Calcolo del punteggio del voto di laurea”.[^4]

**1. Calcolo della media**

- Si usa la **media ponderata** delle votazioni degli esami sostenuti (escluso l’esame di prova finale).[^4]
- Nel calcolo la valutazione “30 e lode” vale **31**.[^4]

**2. Conversione in centodecimi**

- Il risultato della media viene moltiplicato per un **fattore pari a 11/3** (undici terzi) per passare da trentesimi a centodecimi.[^4]

**3. Punti aggiuntivi**

- Si aggiungono:
  - **Fino a 6 punti** legati a media e voto di prova finale, con formula:
    \((\text{voto_prova_finale} - 18)/12 * 4 + (\text{media_ponderata} - 18)/12 * 2\).[^4]
    - Di fatto, voto alto alla prova finale e media alta producono bonus vicino al massimo di 6.[^4]
  - **Fino a 2 punti** per la **durata degli studi**:[^4]
    - 2 punti se la prova finale viene sostenuta, da studente in corso, entro la **prima sessione autunnale del terzo anno** (settembre/ottobre).  
    - 1 punto se sostenuta entro **dicembre** del terzo anno.[^4]
  - Per studenti con periodi di mobilità internazionale o disabilità sono previste regole specifiche di “estensione” della durata normale.[^4]

**4. Punteggio finale e lode**

- Il punteggio finale si ottiene **approssimando all’intero più vicino** la somma delle componenti.[^4]
- La **lode** è attribuita se il punteggio, prima dell’arrotondamento, è **maggiore o uguale a 111**.[^4]

**Preset DISI (triennali):**

- `baseScale = 30`, `useWeightedAverage = true`, `includeThesisInAverage = false`, `lodeNumericValue = 31`.  
- `conversionFactor = 11/3`.  
- Bonus components:
  - `exam_final_and_average_formula`: max 6, formula parametrica.  
  - `duration`: 0–2 in funzione della data.  
- `honoursRule`: `minFinalBeforeHonours = 111`.

### DII – Ingegneria Industriale (L9) – laurea triennale

Regolamento: “Regolamento della prova finale per il conseguimento della laurea in Ingegneria Industriale (L9)” (DR 1161/2023), con Allegato 1 “Calcolo del punteggio del voto di laurea”.[^5]

**1. Calcolo della media**

- Media ponderata delle votazioni degli esami sostenuti, **incluso l’esame di prova finale**.[^5]
- Anche qui “30 e lode” vale 31.[^5]
- Non si considerano esami con giudizio e esami soprannumerari.[^5]

**2. Conversione in centodecimi**

- Il risultato della media viene moltiplicato per un **fattore 3,85** per la conversione da trentesimi a centodecimi.[^5]

**3. Punti aggiuntivi**

- Bonus massimo complessivo relativamente semplice:[^5]
  - **Durata degli studi**:  
    - 2 punti se la prova finale è sostenuta in corso entro la **prima sessione autunnale del terzo anno** (luglio o settembre).[^5]
    - 1 punto se sostenuta entro l’appello di **novembre** del terzo anno in corso.[^5]
  - **Mobilità internazionale**: 1 punto se lo studente ha partecipato a programma di mobilità (es. Erasmus) con almeno 18 CFU riconosciuti.[^5]

**4. Punteggio finale e lode**

- Il voto finale è la somma (media convertita + bonus) **approssimata all’intero più vicino**.[^5]
- Se il valore intero \(n\) è **≥ 111**, la votazione finale è 110/110 con lode.[^5]

**Preset DII Ingegneria Industriale L9:**

- `baseScale = 30`, `useWeightedAverage = true`, `includeThesisInAverage = true`, `lodeNumericValue = 31`.  
- `conversionFactor = 3.85`.  
- Bonus components: `duration` (max 2) e `mobility` (1 punto).  
- `honoursRule`: `minFinalBeforeHonours = 111`.

### DII – Lauree magistrali (Ingegneria Industriale)

Regolamento: “Regolamento prova finale e conferimento del titolo dei corsi di laurea magistrale del Dipartimento di Ingegneria Industriale” (DR 1334/2025).[^9]

**Media e conversione**

- Il voto di laurea magistrale è espresso in centodecimi ed è determinato come **media pesata sui CFU di tutte le attività formative del biennio, compresa la prova finale**.[^9]
- Nel calcolo, la votazione di 30 e lode vale 31; la media in trentesimi viene moltiplicata per un fattore **3,85**.[^9]

**Bonus e lode**

- Il regolamento non prevede una tabella di bonus aggiuntivi analoghi a quelli di L9; il voto di laurea è sostanzialmente il valore convertito e arrotondato, mentre la lode può essere attribuita dalla commissione, all’unanimità, se il voto così ottenuto supera 110.[^9]

**Preset DII lauree magistrali:**

- `baseScale = 30`, `useWeightedAverage = true`, `includeThesisInAverage = true`, `lodeNumericValue = 31`.  
- `conversionFactor = 3.85`.  
- Nessuna componente bonus parametrizzata; eventuali arrotondamenti e lode gestiti secondo soglia 110 e unanimità della commissione.[^9]

## Schema di implementazione per un calcolatore con preset

### Rappresentazione dei corsi e delle regole

Per implementare un calcolatore generico con preset specifici per corso, è pratico definire:

- Una **tabella di corsi** indicizzati da (ateneo, dipartimento, codice corso/matricola Cineca).  
- Per ogni corso, una struttura `GraduationRule` come da modello astratto, includendo:
  - `ruleId` (stringa interna, es. `unibs-dii-lt-509`, `unitn-disi-l-2025`).  
  - Metadati (ateneo, nome corso, ordinamento/coorte minima e massima a cui la regola si applica).  
  - Parametri numerici (fattore di conversione, massimi dei bonus, soglie di lode).  
  - Una descrizione ad uso UI (testuale) ricavata dai regolamenti ufficiali.[^3][^9][^8][^6][^7][^5][^4]

### Esempio di preset (pseudo‑TypeScript)

```ts
const uniTrentoDISI2025: GraduationRule = {
  baseScale: 30,
  useWeightedAverage: true,
  includeThesisInAverage: false,
  lodeNumericValue: 31,
  conversionFactor: 11 / 3,
  rounding: 'nearest',
  bonusComponents: [
    {
      id: 'final_and_average_formula',
      description: 'Bonus fino a 6 punti in funzione di media e voto di prova finale',
      maxPoints: 6,
      mode: 'numeric-formula',
    },
    {
      id: 'duration',
      description: 'Bonus fino a 2 punti per laurea in corso (luglio-settembre/dicembre 3° anno)',
      maxPoints: 2,
      mode: 'discrete-table',
    },
  ],
  honoursRule: {
    minFinalBeforeHonours: 111,
    extraConditions: 'Attribuzione automatica se soglia raggiunta, secondo regolamento DISI',
  },
};

const uniBresciaDIITriennale: GraduationRule = {
  baseScale: 30,
  useWeightedAverage: true,
  includeThesisInAverage: false,
  lodeNumericValue: 30,
  conversionFactor: 110 / 30,
  rounding: 'nearest',
  bonusComponents: [
    {
      id: 'career',
      description: 'Esperienze estero, lodi, premi',
      maxPoints: 2,
      mode: 'manual-by-commission',
    },
    {
      id: 'thesis',
      description: 'Qualità tesi e discussione',
      maxPoints: 4,
      mode: 'manual-by-commission',
    },
    {
      id: 'duration',
      description: 'Laurea in corso',
      maxPoints: 1,
      mode: 'discrete-table',
    },
  ],
  honoursRule: {
    minFinalBeforeHonours: 110,
    extraConditions: 'Richiesta decisione unanime della commissione',
  },
};
```

### Gestione di ordinamenti e cambi di regolamento

Molti regolamenti specificano un **anno di entrata in vigore** o una coorte (es. “entra in vigore dagli appelli 2015/16” o “coorte 2023/24”).[^8][^6][^5][^4]
Nel modello dati è quindi necessario:

- Agganciare ogni `GraduationRule` a un **intervallo di coorti** (es. `from_cohort = 2015`, `to_cohort = 2023`).  
- Selezionare la regola pertinente in base all’anno di immatricolazione o all’anno di ordinamento del piano di studi.  

Per corsi come Medicina e Chirurgia, in cui l’Art. 18 cambia nel tempo (es. introduzione/abolizione della componente progress test), è consigliabile avere **più preset per lo stesso corso** differenziati per coorte, con un campo opzionale `deprecated_fields` per mantenere compatibilità con carriere più vecchie.[^10][^8]

## Limiti e passi successivi

- I regolamenti riportati coprono solo una parte dei corsi di UniBS (principalmente Ingegneria e Medicina) e di UniTrento (Ingegneria DISI e DII).[^3][^9][^8][^6][^7][^5][^4]
- Per corsi come Giurisprudenza (UniBS) o facoltà non coperte in questo report, è necessario reperire e parsare i rispettivi regolamenti di prova finale, spesso allegati ai siti dei corsi di studio o nei portali interni.[^12][^11]
- Dal punto di vista di implementazione software, l’approccio più scalabile è:
  - definire il modello astratto una volta sola;
  - costruire una pipeline di scraping/manual entry che popola i preset per (ateneo, corso, coorte) partendo dai regolamenti;
  - prevedere nel frontend una modalità “avanzata” in cui l’utente può sovrascrivere i parametri del corso, utile sia per correzioni sia per corsi non ancora mappati.

Con questo assetto, l’applicazione può già supportare correttamente i principali corsi di Ingegneria e Medicina di Brescia e Trento e scalare progressivamente verso “tutti i modi” di calcolo del voto di laurea nelle università italiane, man mano che vengono codificati nuovi preset.

---

## References

1. [[PDF] Regolamento della Prova Finale di Laurea Magistrale - UNIBS](https://www.unibs.it/sites/default/files/2021-06/Regolamento%20prova%20finale%20di%20laurea%20magistrale%20ord.%20270.pdf) - 1.1 La prova finale consiste nell'esposizione e nella discussione, da parte del laureando, della tes...

2. [[PDF] Regolamento della Prova Finale di Laurea (Testo completo ... - UNIBS](https://www.unibs.it/sites/default/files/2021-06/Regolamento%20prova%20finale%20di%20laurea%20triennale%20ord.%20509.pdf) - 4.3 La votazione finale si ottiene dalla conversione in centodecimi della media di cui al punto 4.2....

3. [Regolamenti per le prove finali - UNIBS](https://www.unibs.it/it/dicatam-regolamenti-prove-finali) - Nel regolamento puoi trovare indicazioni per quanto riguarda le norme per l'elaborazione e la presen...

4. [[PDF] Regolamento prova finale lauree DISI 2025 - Corsi - UniTrento](https://corsi.unitn.it/sites/cds/files/2025-11/regolamento-prova-finale-lauree-disi-2025.pdf) - da un docente afferente all'Università di Trento nei settori INF/01 e ING-INF/*, ... Il voto di laur...

5. [[PDF] REGOLAMENTODELLAPROVAF...](https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-laurea-dii-2024.pdf) - Università di Trento. Emanato con DR n. 1161 del 23 novembre 2023. Pagina ... Il voto di laurea, def...

6. [[PDF] Regolamento per lo svolgimento della prova finale e valutazione ...](https://corsi.unibs.it/sites/cdl/files/2023-02/DII_RegolamentoProvaFinaleLT.pdf) - Nel caso di superamento dell'esame di laurea, la votazione di base si ottiene dalla conversione in c...

7. [[PDF] REGOLAMENTO DELLE PROVE FINALI PER I CORSI DI LAUREA ...](https://corsi.unibs.it/sites/cdl/files/2024-04/Regolamento%20per%20la%20prova%20finale.pdf) - a) Entro le scadenze previste annualmente dal CCSA, l'allievo dovrà presentare in modalità telematic...

8. [[PDF] Regolamento Didattico CORSO DI LAUREA MAGISTRALE A CICLO ...](https://corsi.unibs.it/sites/cdl/files/2024-06/Regolamento_Piano2023.pdf) - A determinare il voto di laurea, espresso in cento decimi, concorrono i seguenti elementi: ... Magis...

9. [[PDF] regolamento prova finale e conferimento del titolo dei corsi di laurea ...](https://corsi.unitn.it/sites/cds/files/2025-11/regolamento-prova-finale-lm-dii-2025_0.pdf) - della disabilità da parte dell'Università di Trento, dal/la delegato/a ... Il voto di laurea magistr...

10. [[PDF] regolamento didattico corso di laurea magistrale in medicina e ...](https://www.unibs.it/sites/default/files/2022-05/Regolamento%20didattico%20CLM%20MEDICINA%20E%20CHIRURGIA%202017-18.pdf) - Università degli Studi di Brescia | Regolamento del Corso di Laurea Magistrale in Medicina e Chirurg...

11. [[PDF] Regolamento Didattico del Corso di Studio in GIURISPRUDENZA](https://corsi.unibs.it/sites/cdl/files/2023-06/Allegato_3_-Regolamento_didattico_Giurisprudenza_23-24.pdf) - commissione di laurea, ai fini della quantificazione del voto di laurea. ... Agreement) tra l'Univer...

12. [[PDF] Regolamento Didattico del Corso di Studio in GIURISPRUDENZA](https://corsi.unibs.it/sites/cdl/files/2025-06/Regolamento%20didattico%20LM%20C.U.%20-%2025-26.pdf) - quantificazione del voto di Laurea. Periodi di studio all'estero. Page 13. 13. Regolamento Didattico...

