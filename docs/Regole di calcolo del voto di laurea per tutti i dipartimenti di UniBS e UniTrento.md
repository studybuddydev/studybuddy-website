# Regole di calcolo del voto di laurea per tutti i dipartimenti di UniBS e UniTrento

## Overview

Questo report estende l’analisi precedente alle regole di calcolo del voto di laurea per l’insieme dei dipartimenti dell’Università di Brescia (UniBS) e dell’Università di Trento (UniTrento), limitatamente ai regolamenti pubblicamente accessibili online.[^1][^2][^3][^4][^5][^6][^7][^8][^9][^10]
Per molti dipartimenti esiste un unico regolamento di “prova finale e conseguimento titolo” che si applica a tutti i corsi di laurea afferenti, con un allegato che definisce la formula di calcolo (media, conversione, bonus, lode); in altri casi il regolamento rinvia a documenti di corso di studio non sempre disponibili, e in tali casi il dettaglio numerico non è completamente ricostruibile.[^11][^12][^13][^1]

## Schema di dati da estrarre

Per standardizzare i preset del calcolatore, per ogni dipartimento/corso si estraggono i seguenti campi:

- Scala di partenza e media: media ponderata/non ponderata in trentesimi, inclusione o meno della prova finale nel calcolo, trattamento del “30 e lode”.[^2][^3][^5][^7][^8][^9][^14][^10]
- Fattore di conversione in centodecimi: coefficiente numerico o descrizione testuale se non specificato.[^3][^5][^7][^8][^9][^14][^10][^2]
- Punti aggiuntivi (bonus): sotto-componenti con massimo assegnabile e regola (durata studi, qualità tesi, mobilità, progress test, tirocini, percorsi di eccellenza, ecc.).[^5][^7][^8][^9][^15][^16][^17][^3]
- Regola di arrotondamento e condizioni per la lode: arrotondamento all’intero più vicino, soglia numerica per la lode, eventuale automatismo o richiesta di unanimità.[^7][^8][^9][^14][^10][^15][^16][^17][^2][^3][^5]

Nelle tabelle seguenti, quando le informazioni non sono reperibili in forma numerica, la riga è marcata come “regola non completamente nota”.

## UniTrento – Sintesi per dipartimenti

### Dipartimento di Lettere e Filosofia (DLM)

Regolamento: “Regolamento prova finale e conferimento del titolo – Dipartimento di Lettere e Filosofia” con Allegato 1 “Calcolo del punteggio del voto di laurea”.[^5]

| Campo | Valore |
| --- | --- |
| Corsi | Beni culturali, Filosofia, Lingue moderne, Studi storici e filologico‑letterari (lauree triennali) |
| Media di base | Media ponderata degli esami, **incluso** l’esame di Prova finale; 30 e lode pesa 31/30; esami sovrannumerari esclusi.[^5] |
| Conversione | Moltiplicazione per coefficiente **3,67** per ottenere la base in centodecimi.[^5] |
| Bonus qualità tesi/prova | Fino a **3 punti**: 3 pt se l’elaborato è di eccellenza (lode + 1 punto, pesato come 32/30), 2 pt se Prova finale 30 e lode (31/30), 1 pt se Prova finale 30/30.[^5] |
| Bonus carriera | Fino a **3 punti** in base alla media ponderata curriculare: 3 pt se media ≥ 29, 2 pt se 28, 1 pt se 27 (con arrotondamento della media a 0,5).[^5] |
| Bonus durata studi | 2 pt se laurea entro sessione autunnale 3° anno; 1 pt se entro sessione invernale 3° anno; 0 altrimenti.[^5] |
| Bonus mobilità | 1 pt per mobilità internazionale con riconoscimento in carriera.[^5] |
| Bonus percorso eccellenza | 1 pt se completato percorso di eccellenza registrato in Esse3.[^5] |
| Lode | Punteggio finale arrotondato all’intero più vicino; se n ≥ 110, voto è 110/110; se punteggio non arrotondato ≥ 110,50 si attribuisce automaticamente la lode.[^5] |

### Dipartimento di Economia e Management (DEM)

Regolamento: “Regolamento prova finale e conseguimento titolo dei corsi di laurea del Dipartimento di Economia e Management” con Allegato 1 “Calcolo del punteggio del voto di laurea”.[^9][^11]

| Campo | Valore |
| --- | --- |
| Corsi | Economia e Management, Gestione aziendale, Amministrazione aziendale e diritto (lauree triennali) |
| Media di base | Media ponderata degli esami **incluso** l’esame di Prova finale; esclusi esami in sovrannumero; il voto più basso viene scartato; 30 e lode conta come 31.[^9] |
| Conversione | Coefficiente **3,86** (media in trentesimi con due decimali × 3,86).[^9] |
| Bonus tesi/prova finale | 2 pt se Prova finale 30/30 e lode; 1 pt se 30/30.[^9] |
| Bonus carriera (max 4 pt) | Include: punteggio da Regolamento Percorso di Eccellenza; 1 pt per mobilità internazionale; 1 pt se Prova finale entro 31 dicembre 3° anno (4° per part‑time); 1 pt per corsi extra di lingua; 1 pt per tirocinio (con regole differenziate per i diversi corsi).[^9] |
| Lode | Voto finale arrotondato all’intero più vicino; se risultato ≥ 110 → 110/110; lode attribuita se risultato (prima dell’arrotondamento) ≥ 111.[^9] |

### Dipartimento di Sociologia e Ricerca Sociale (DSRS)

Regolamento: “Dipartimento di Sociologia e Ricerca Sociale – Regolamento prova finale e conseguimento titolo per i corsi di laurea”.[^10]

| Campo | Valore |
| --- | --- |
| Corsi | Lauree triennali afferenti al DSRS |
| Media di base | Media ponderata delle votazioni degli esami sostenuti, **compreso** l’esame di Prova finale; 30 e lode = 31/30.[^10] |
| Conversione | Moltiplicazione per coefficiente **3,9**, con arrotondamento all’intero più vicino.[^10] |
| Bonus | Non sono previsti bonus espliciti diversi da quelli intrinseci alla Prova finale; il regolamento specifica solo la media, conversione e la soglia per la lode.[^10] |
| Lode | Lode assegnata se il risultato del calcolo (prima dell’arrotondamento) è ≥ 111/110.[^10] |

### Dipartimento di Ingegneria Civile, Ambientale e Meccanica (DICAM)

Regolamento: “Regolamento prova finale e conseguimento titolo corsi di laurea in Ingegneria Civile e Ingegneria per l’Ambiente e il Territorio” con Allegato 1 “Calcolo del punteggio del voto di laurea”.[^7]

| Campo | Valore |
| --- | --- |
| Corsi | Ingegneria Civile, Ingegneria per l’Ambiente e il Territorio (lauree triennali) |
| Media di base | Media ponderata delle votazioni degli esami, **incluso** l’esame di Prova finale; 30 e lode = 31; esami in sovrannumero esclusi.[^7] |
| Conversione | Coefficiente **3,85**.[^7] |
| Bonus durata (max 2 pt) | 2 pt se Prova finale entro prima sessione autunnale del 3° anno (settembre/ottobre, in corso); 1,5 pt se entro fine dicembre 3° anno; 1 pt se entro appello straordinario (marzo).[^7] |
| Bonus mobilità | 1 pt se mobilità estera (es. Erasmus) con almeno 18 CFU riconosciuti.[^7] |
| Lode | Punteggio finale (dopo bonus) arrotondato all’intero più vicino; lode se punteggio senza arrotondamento ≥ 111.[^7] |

### Dipartimento di Ingegneria e Scienza dell’Informazione (DISI)

Per DISI esistono regolamenti separati per lauree triennali e magistrali; l’allegato 1 dei regolamenti triennali definisce la formula di calcolo con fattore 11/3 e bonus per media e prova finale, mentre per le magistrali il meccanismo è molto simile ma su corsi LM e con eventuali differenze nelle soglie di lode.[^18][^6][^2]

Poiché la parte dettagliata per il calcolo è già stata descritta nel report precedente, si riporta qui una riga di sintesi; per il tuo calcolatore il preset può essere riutilizzato a livello di dipartimento e filtrato per ordinamento/coorte.

| Campo | Lauree triennali DISI |
| --- | --- |
| Media di base | Media ponderata degli esami (escluso esame di Prova finale); 30 e lode = 31.[^2][^6] |
| Conversione | Fattore **11/3**.[^2][^6] |
| Bonus | Formula fino a 6 punti in funzione di media e voto di Prova finale; 0–2 punti per durata degli studi (laurea in corso entro determinate sessioni).[^2][^6] |
| Lode | Se punteggio (prima dell’arrotondamento) ≥ 111 → 110 e lode.[^2][^6] |

Per le magistrali DISI, il regolamento analogo specifica media pesata, conversione in centodecimi e condizioni per la lode, ma non sempre introduce bonus aggiuntivi; le informazioni numeriche complete richiedono la lettura integrale del relativo allegato (non interamente riportato negli estratti disponibili).[^18]

### Dipartimento di Ingegneria Industriale (DII) – LM

Regolamento: “Regolamento prova finale e conseguimento titolo laurea magistrale LM‑33, LM‑31, LM‑22, LM‑53” (Mechatronics, Management and Industrial Systems Engineering, Materials and Production Engineering, Materials Engineering).[^4]

Negli estratti disponibili, il regolamento definisce la struttura della Prova finale (tesi originale, durata, commissione, ecc.) ma non riporta nell’estratto letto l’allegato numerico con il dettaglio della formula di calcolo (media, conversione, bonus) per le LM.[^4]
Tuttavia, in coerenza con il regolamento DII L9 (laurea in Ingegneria Industriale) che usa media ponderata inclusiva della prova finale con fattore 3,85 e bonus per durata e mobilità, è ragionevole trattare le LM DII come corsi con **regola parzialmente nota** fino a lettura completa dell’allegato specifico.[^14][^4]

### Dipartimenti di Matematica e altri

Per il **Dipartimento di Matematica**, il regolamento di prova finale contiene un allegato analogo che definisce la media ponderata, un coefficiente di conversione (non completamente visibile nell’estratto) e criteri per la lode; il dettaglio numerico dei bonus non è interamente ricostruibile dagli estratti disponibili e richiede lettura completa del PDF.[^8]
Altri dipartimenti (es. Psicologia e Scienze Cognitive, Fisica, Biologia, ecc.) dispongono di regolamenti simili, ma non sono stati recuperati tutti i relativi allegati numerici in questa sessione; anche qui la struttura è sempre: media ponderata, conversione con coefficiente dipartimentale, eventuali bonus e regola per la lode.[^3][^8]

## UniBS – Sintesi per dipartimenti

Per UniBS, la logica è simile ma i regolamenti sono spesso pubblicati a livello di dipartimento o di corso di studio; la pagina “Regolamenti per le prove finali” del DICATAM (Ingegneria Civile, Architettura, Territorio, Ambiente e di Matematica) funge da indice verso i regolamenti dei singoli corsi.[^1]
Una parte dei regolamenti di Ingegneria (DII, DICATAM) e di Medicina è già stata analizzata in dettaglio nel report precedente; di seguito si riassumono le regole per i dipartimenti principali, con nota sui casi in cui i dati numerici non sono completi.

### Dipartimento di Ingegneria dell’Informazione (DII) – lauree triennali

Regolamento: “Regolamento per lo svolgimento della prova finale e valutazione conclusiva per i corsi di laurea afferenti al Dipartimento di Ingegneria dell’Informazione”.[^15]

| Campo | Valore |
| --- | --- |
| Corsi | Lauree triennali in Ingegneria Informatica, Elettronica, ecc. |
| Media di base | Media ponderata per CFU degli esami di profitto; esclusi crediti senza voto e esami soprannumerari.[^15] |
| Conversione | Conversione in centodecimi (fattore non esplicitato, usualmente 110/30 nel regolamento).[^15] |
| Bonus (max 7 pt) | Fino a 2 pt carriera (lodi, estero, premi), fino a 4 pt qualità tesi + esposizione, 1 pt laurea in corso.[^15] |
| Lode | Se punteggio complessivo ≥ 110, voto fissato a 110/110; se punteggio arrotondato all’intero più vicino > 110 e l’attribuzione è unanime, si conferisce la lode.[^15] |

### Dipartimento DICATAM – Ingegneria Civile e Ambientale, Architettura, Matematica

La pagina “Regolamenti per le prove finali” del DICATAM rimanda a regolamenti specifici per corsi di laurea (Ingegneria Civile, Ingegneria per l’Ambiente e il Territorio, Architettura, Matematica, ecc.); in uno dei regolamenti di area civile/ambientale si ritrova una struttura di voto finale simile a quella già descritta in precedenza:[^16][^1]

- Base = media (spesso arrotondata all’unità) e conversione in centodecimi.[^16]
- Bonus struttura a blocchi (es. fino a 3 punti carriera, 3 punti elaborato, 4 punti esposizione) con soglia 110 + unanimità per la lode.[^16]

Per Architettura e Matematica il dettaglio numerico dei bonus non è visibile negli estratti disponibili, ma i regolamenti seguono la stessa logica di media ponderata, conversione in centodecimi, bonus per carriera/tesi/esposizione e lode all’unanimità sopra una certa soglia.[^1]

### Dipartimento di Medicina e Chirurgia – Medicina (LM‑41)

Per il corso di laurea magistrale a ciclo unico in Medicina e Chirurgia, il regolamento didattico e il regolamento di corso definiscono un modello più articolato con componenti A (media + lodi + progress test), B (durata studi + mobilità) e C (tesi), già descritto nel dettaglio nel report precedente:[^19][^17]

- Media aritmetica degli esami espressa in centodecimi (non ponderata).[^17]
- Lodi: 0,2 punti per ciascuna lode, fino a 2 punti.[^17]
- Eventuale componente progress test (0,4 per test sopra la media della coorte).[^19]
- 2 o 1 punto per laurea in 6 o 7 anni; 0,2 punti/mese di mobilità internazionale fino a 2 punti.[^17]
- Tesi: fino a 9 punti per tesi di ricerca, 5 per tesi compilativa.[^17]
- Lode per soglia minima sul punteggio complessivo e unanimità della commissione.[^17]

### Dipartimento di Giurisprudenza – LMG/01

Il regolamento didattico del corso in Giurisprudenza a ciclo unico rinvia a un separato regolamento di prova finale per il dettaglio numerico del voto di laurea e menziona che lo stage può essere considerato ai fini del voto, “a discrezione della commissione di laurea”.[^12][^13]
Tuttavia, nel corpus consultato non è stato individuato l’allegato con la tabella numerica, per cui i dati restano **non completamente noti**; per il tuo calcolatore è opportuno modellare Giurisprudenza UniBS come corso con preset incompleto da completare manualmente quando il regolamento dettagliato sarà reperito.[^13][^12]

### Altri dipartimenti UniBS

Altri dipartimenti (Economia e Management, Odontoiatria, Professioni sanitarie, Lettere, ecc.) hanno propri regolamenti di prova finale, spesso allegati alle pagine dei corsi di studio e non sempre indicizzati in modo centralizzato; non sono emersi, nei risultati esaminati, estratti numerici sufficienti a ricostruire in modo sicuro le formule di calcolo (fattori di conversione, tetti di bonus) per tutti questi corsi.[^20][^21][^12][^13][^1]
In generale, la struttura è sempre “media (preferibilmente ponderata) + conversione in centodecimi + bonus (carriera/tesi/durata/mobilità) + soglia per lode”, ma per rispettare il vincolo di non inventare dati numerici, è necessario integrare la presente mappatura con una fase successiva di scraping/manual entry dei singoli regolamenti di corso.[^21][^12][^13][^1]

## Considerazioni per l’estrazione massiva dei dati

1. **Indice per dipartimento**: UniTrento ha una struttura relativamente pulita, con un regolamento di prova finale per dipartimento (DISI, DII, DICAM, DLF, DEM, DSRS, ecc.), ciascuno con allegato di calcolo; UniBS ha una struttura mista con regolamenti di dipartimento e di corso, indicizzati in pagine come “Regolamenti per le prove finali”.[^9][^10][^3][^4][^5][^7][^1]
2. **Parsing mirato degli allegati**: in quasi tutti i casi, la formula di calcolo è concentrata in un allegato (“Allegato 1 – Calcolo del punteggio del voto di laurea”), che segue uno schema standard (media, conversione, bonus, lode); questo rende possibile una parsificazione automatica per pattern una volta scaricati i PDF.[^10][^5][^7][^9]
3. **Gestione delle coorti**: molti regolamenti specificano un anno di entrata in vigore, coorte o ordinamento a cui si applicano; i preset vanno quindi versionati per coorte, con un mapping (ateneo, dipartimento, corso, coorte) → regola.[^15][^3][^5][^7][^9][^10]
4. **Casi con dato incompleto**: dove le fonti pubbliche non esplicitano fattori o massimi dei bonus (es. Giurisprudenza UniBS, alcune LM di DII UniTrento, corsi non trovati), è necessario prevedere nel modello la possibilità di marcare un preset come “parziale” e offrire all’utente UI per completare o correggere manualmente.[^8][^12][^13][^4]

Nel complesso, per tutti i dipartimenti di UniTrento coperti dai regolamenti reperiti (Lettere e Filosofia, DEM, DSRS, DISI, DICAM, Matematica, DII LM e altri), e per i principali dipartimenti di UniBS (Ingegneria DII, DICATAM, Medicina, Giurisprudenza con regola parziale), sono note le strutture di calcolo del voto di laurea a livello di dipartimento, con eventuali specifiche per singoli corsi da integrare caso per caso.

---

## References

1. [Regolamenti per le prove finali - UNIBS](https://www.unibs.it/it/dicatam-regolamenti-prove-finali) - Nel regolamento puoi trovare indicazioni per quanto riguarda le norme per l'elaborazione e la presen...

2. [[PDF] Regolamento prova finale lauree DISI 2025 - Corsi - UniTrento](https://corsi.unitn.it/sites/cds/files/2025-11/regolamento-prova-finale-lauree-disi-2025.pdf) - da un docente afferente all'Università di Trento nei settori INF/01 e ING-INF/*, ... Il voto di laur...

3. [[PDF] regolamento prova finale e conseguimento titolo corsi di laurea ...](https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-lauree-dpsco-2022.pdf) - Per le coorti ante 2022/23 resta in vigore il Regolamento prova finale precedente. Page 7. REGOLAMEN...

4. [[PDF] REGOLAMENTO PROVA FINALE E CONSEGUIMENTO TITOLO ...](https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-lm-dii-2022.pdf) - REGOLAMENTO PROVA FINALE E. CONSEGUIMENTO TITOLO LAUREA. MAGISTRALE. LM-33 ... della disabilità da p...

5. [[PDF] Regolamento di prova finale lauree del Dipartimento di Lettere e ...](https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-lauree-dlf_2015.pdf) - REGOLAMENTO PROVA FINALE DI LAUREA TRIENNALE. E CONFERIMENTO DEL TITOLO corsi ... unitn.it/lettere/2...

6. [[PDF] regolamento-prova-finale-lauree-disi-2022.pdf - Corsi - UniTrento](https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-lauree-disi-2022.pdf) - REGOLAMENTO PROVA FINALE E CONFERIMENTO DEL TITOLO CORSI DI LAUREA DEL ... da un docente afferente a...

7. [[PDF] regolamento prova finale e conseguimento titolo corsi di laurea in](https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-lauree-dicam-2023.pdf) - REGOLAMENTO PROVA FINALE E CONSEGUIMENTO TITOLO CORSI DI LAUREA DIPARTIMENTO. DI INGEGNERIA CIVILE, ...

8. [[PDF] dipartimento di matematica regolamento prova finale e conferimento ...](https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-laurea-matematica-2022.pdf) - L'esame di Prova Finale sostenuto da un laureando con carriera non completa è nullo. Page 5. REGOLAM...

9. [[PDF] REGOLAMENTOPROVAFINALE...](https://corsi.unitn.it/sites/cds/files/2024-12/regolamento-prova-finale-lauree-dem-2023.pdf) - 1. Il voto di laurea, definito in centodecimi, viene determinato dall'Ufficio, entro i 30 giorni di ...

10. [[PDF] DIPARTIMENTO DI SOCIOLOGIA E RICERCA SOCIALE ... - Corsi](https://corsi.unitn.it/sites/cds/files/2024-12/regolamento-prova-finale-lauree-dsrs-2023.pdf) - DIPARTIMENTO DI SOCIOLOGIA E RICERCASOCIALE - REGOLAMENTO PROVA FINALE E ... laurea. b. Esame di Pro...

11. [Esame di laurea | Economia e management - Corsi - UniTrento](https://corsi.unitn.it/it/economia-e-management/laurearsi/esame-di-laurea) - Regolamento prova finale lauree Dipartimento di Economia e Management 2025 ... Università di Trento ...

12. [[PDF] Regolamento Didattico del Corso di Studio in GIURISPRUDENZA](https://corsi.unibs.it/sites/cdl/files/2023-06/Allegato_3_-Regolamento_didattico_Giurisprudenza_23-24.pdf) - commissione di laurea, ai fini della quantificazione del voto di laurea. ... Agreement) tra l'Univer...

13. [[PDF] Regolamento Didattico del Corso di Studio in GIURISPRUDENZA](https://corsi.unibs.it/sites/cdl/files/2025-06/Regolamento%20didattico%20LM%20C.U.%20-%2025-26.pdf) - quantificazione del voto di Laurea. Periodi di studio all'estero. Page 13. 13. Regolamento Didattico...

14. [[PDF] REGOLAMENTODELLAPROVAF...](https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-laurea-dii-2024.pdf) - Università di Trento. Emanato con DR n. 1161 del 23 novembre 2023. Pagina ... Il voto di laurea, def...

15. [[PDF] Regolamento per lo svolgimento della prova finale e valutazione ...](https://corsi.unibs.it/sites/cdl/files/2023-02/DII_RegolamentoProvaFinaleLT.pdf) - Nel caso di superamento dell'esame di laurea, la votazione di base si ottiene dalla conversione in c...

16. [[PDF] REGOLAMENTO DELLE PROVE FINALI PER I CORSI DI LAUREA ...](https://corsi.unibs.it/sites/cdl/files/2024-04/Regolamento%20per%20la%20prova%20finale.pdf) - a) Entro le scadenze previste annualmente dal CCSA, l'allievo dovrà presentare in modalità telematic...

17. [[PDF] Regolamento Didattico CORSO DI LAUREA MAGISTRALE A CICLO ...](https://corsi.unibs.it/sites/cdl/files/2024-06/Regolamento_Piano2023.pdf) - A determinare il voto di laurea, espresso in cento decimi, concorrono i seguenti elementi: ... Magis...

18. [[PDF] Regolamento prova finale lauree magistrali DISI 2025 - Corsi](https://corsi.unitn.it/sites/cds/files/2025-11/regolamento-prova-finale-lm-disi-2025.pdf) - Il ruolo di Relatore può essere svolto: a. da un docente afferente al Dipartimento, b. da un docente...

19. [[PDF] regolamento didattico corso di laurea magistrale in medicina e ...](https://www.unibs.it/sites/default/files/2022-05/Regolamento%20didattico%20CLM%20MEDICINA%20E%20CHIRURGIA%202017-18.pdf) - Università degli Studi di Brescia | Regolamento del Corso di Laurea Magistrale in Medicina e Chirurg...

20. [[08714] CORSO DI LAUREA IN TECNICHE DELLA PREVENZIONE ...](https://unibs.coursecatalogue.cineca.it/corsi/2024/141) - Università degli Studi di Brescia. Course Catalogue. Vai al portale di ateneo ... A determinare il v...

21. [Laurearsi - Medicina e Chirurgia - Corsi di Studio - UNIBS](https://corsi.unibs.it/it/medicinaechirurgia/laurearsi) - Come ottenere il punteggio aggiuntivo al voto di laurea. Nella ... © 2011 Università degli Studi di ...

