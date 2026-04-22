/* ============================================================
   Calcolatore Voto di Laurea – StudyBuddy
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────────────────────
  // 1. DATA MODEL
  // ──────────────────────────────────────────────────────────
  const TOTAL_CFU = 180;

  /**
   * BonusComponent types:
   *   checkbox  – checked → adds `max` points
   *   discrete  – <select> with options [{label, value}]
   *   slider    – range input, 0..max, step
   *   counter   – integer counter, each unit = `pointsPerUnit`
   *   computed  – read-only, derived by a formula (for DISI)
   */

  const DEPARTMENTS = {
    unitn: {
      name: 'Università di Trento',
      faculties: {
        DISI: {
          name: 'Ingegneria Informatica (DISI)',
          conversion: 11 / 3,
          lodeThreshold: 111,
          includeFinal: false,
          thirtyL: 31,
          weighted: true,
          regulationUrl: 'https://corsi.unitn.it/sites/cds/files/2025-11/regolamento-prova-finale-lauree-disi-2025.pdf',
          bonusComponents: [
            {
              id: 'thesis_grade',
              label: 'Voto Prova Finale (18–30L)',
              type: 'thesis_grade',
              hint: 'Il voto dell\'esame di laurea. 30L = 31. Usato nella formula bonus DISI.',
            },
            {
              id: 'formula_bonus',
              label: 'Bonus media + prova finale',
              type: 'computed',
              max: 6,
              hint: 'Calcolato automaticamente: (PF−18)/12×4 + (media−18)/12×2',
            },
            {
              id: 'duration',
              label: 'Durata degli studi',
              type: 'discrete',
              options: [
                { label: 'Settembre/Ottobre 3° anno (in corso)', value: 2 },
                { label: 'Dicembre 3° anno', value: 1 },
                { label: 'Oltre / fuori corso', value: 0 },
              ],
            },
          ],
        },

        DII_L9: {
          name: 'Ingegneria Industriale L9 (DII)',
          conversion: 3.85,
          lodeThreshold: 111,
          includeFinal: true,
          thirtyL: 31,
          weighted: true,
          regulationUrl: 'https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-laurea-dii-2024.pdf',
          bonusComponents: [
            {
              id: 'duration',
              label: 'Durata degli studi',
              type: 'discrete',
              options: [
                { label: 'Luglio/Settembre 3° anno (in corso)', value: 2 },
                { label: 'Novembre 3° anno (in corso)', value: 1 },
                { label: 'Oltre / fuori corso', value: 0 },
              ],
            },
            {
              id: 'mobility',
              label: 'Mobilità internazionale (≥ 18 CFU riconosciuti)',
              type: 'checkbox',
              max: 1,
            },
          ],
        },

        DLM: {
          name: 'Lettere e Filosofia (DLM)',
          conversion: 3.67,
          lodeThreshold: 110.5,
          includeFinal: true,
          thirtyL: 31,
          weighted: true,
          regulationUrl: 'https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-lauree-dlf_2015.pdf',
          bonusComponents: [
            {
              id: 'thesis',
              label: 'Qualità Prova Finale',
              type: 'discrete',
              options: [
                { label: 'Eccellenza (lode + 1 punto extra)', value: 3 },
                { label: 'Prova Finale 30 e lode', value: 2 },
                { label: 'Prova Finale 30/30', value: 1 },
                { label: 'Altro', value: 0 },
              ],
            },
            {
              id: 'career',
              label: 'Bonus carriera (media curriculare)',
              type: 'discrete',
              options: [
                { label: 'Media ≥ 29', value: 3 },
                { label: 'Media ≥ 28', value: 2 },
                { label: 'Media ≥ 27', value: 1 },
                { label: 'Media < 27', value: 0 },
              ],
              hint: 'Arrotondamento media a 0,5.',
            },
            {
              id: 'duration',
              label: 'Durata degli studi',
              type: 'discrete',
              options: [
                { label: 'Sessione autunnale 3° anno (sett/ott)', value: 2 },
                { label: 'Sessione invernale 3° anno (dic/gen)', value: 1 },
                { label: 'Oltre', value: 0 },
              ],
            },
            {
              id: 'mobility',
              label: 'Mobilità internazionale riconosciuta in carriera',
              type: 'checkbox',
              max: 1,
            },
            {
              id: 'excellence',
              label: 'Percorso di eccellenza completato (Esse3)',
              type: 'checkbox',
              max: 1,
            },
          ],
        },

        DEM: {
          name: 'Economia e Management (DEM)',
          conversion: 3.86,
          lodeThreshold: 111,
          includeFinal: true,
          thirtyL: 31,
          weighted: true,
          regulationUrl: 'https://corsi.unitn.it/sites/cds/files/2024-12/regolamento-prova-finale-lauree-dem-2023.pdf',
          bonusComponents: [
            {
              id: 'thesis',
              label: 'Prova Finale',
              type: 'discrete',
              options: [
                { label: 'Prova Finale 30 e lode', value: 2 },
                { label: 'Prova Finale 30/30', value: 1 },
                { label: 'Altro', value: 0 },
              ],
            },
            {
              id: 'excellence',
              label: 'Percorso di Eccellenza',
              type: 'checkbox',
              max: 1,
            },
            {
              id: 'mobility',
              label: 'Mobilità internazionale',
              type: 'checkbox',
              max: 1,
            },
            {
              id: 'duration',
              label: 'Laurea entro 31/12 del 3° anno',
              type: 'checkbox',
              max: 1,
            },
            {
              id: 'language',
              label: 'Corsi extra di lingua certificati',
              type: 'checkbox',
              max: 1,
            },
            {
              id: 'internship',
              label: 'Tirocinio riconosciuto',
              type: 'checkbox',
              max: 1,
            },
          ],
        },

        DSRS: {
          name: 'Sociologia e Ricerca Sociale (DSRS)',
          conversion: 3.9,
          lodeThreshold: 111,
          includeFinal: true,
          thirtyL: 31,
          weighted: true,
          regulationUrl: 'https://corsi.unitn.it/sites/cds/files/2024-12/regolamento-prova-finale-lauree-dsrs-2023.pdf',
          bonusComponents: [],
          bonusNote: 'Il regolamento DSRS non prevede bonus espliciti oltre alla conversione della media.',
        },

        DICAM: {
          name: 'Ingegneria Civile / Amb. (DICAM)',
          conversion: 3.85,
          lodeThreshold: 111,
          includeFinal: true,
          thirtyL: 31,
          weighted: true,
          regulationUrl: 'https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-lauree-dicam-2023.pdf',
          bonusComponents: [
            {
              id: 'duration',
              label: 'Durata degli studi',
              type: 'discrete',
              options: [
                { label: 'Prima sessione autunnale 3° anno (set/ott)', value: 2 },
                { label: 'Fine dicembre 3° anno', value: 1.5 },
                { label: 'Appello straordinario (marzo) 3° anno', value: 1 },
                { label: 'Oltre', value: 0 },
              ],
            },
            {
              id: 'mobility',
              label: 'Mobilità internazionale (Erasmus, ≥ 18 CFU)',
              type: 'checkbox',
              max: 1,
            },
          ],
        },

        DII_LM: {
          name: 'Ingegneria Industriale LM (DII)',
          conversion: 3.85,
          lodeThreshold: 111,
          includeFinal: true,
          thirtyL: 31,
          weighted: true,
          regulationUrl: 'https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-lm-dii-2022.pdf',
          bonusComponents: [
            {
              id: 'duration',
              label: 'Durata degli studi',
              type: 'discrete',
              options: [
                { label: 'In corso (sessione autunnale 2° anno)', value: 2 },
                { label: 'In corso (entro dicembre 2° anno)', value: 1 },
                { label: 'Oltre', value: 0 },
              ],
            },
            {
              id: 'mobility',
              label: 'Mobilità internazionale (≥ 18 CFU riconosciuti)',
              type: 'checkbox',
              max: 1,
            },
          ],
          bonusNote: 'Regola LM: l\'allegato numerico completo non è interamente disponibile. Stima parziale.',
          partial: true,
        },

        MAT: {
          name: 'Matematica',
          conversion: 3.67,
          lodeThreshold: 110,
          includeFinal: true,
          thirtyL: 31,
          weighted: true,
          regulationUrl: 'https://corsi.unitn.it/sites/cds/files/2024-11/regolamento-prova-finale-laurea-matematica-2022.pdf',
          bonusComponents: [
            {
              id: 'flat_bonus',
              label: 'Punti bonus commissione (stima)',
              type: 'slider',
              max: 8,
              step: 1,
              hint: 'Dettaglio bonus non completamente estratto dal regolamento. Inserisci la tua stima.',
            },
          ],
          bonusNote: 'I dettagli numerici del bonus non sono completamente estratti dal regolamento ufficiale.',
          partial: true,
        },
      },
    },

    unibs: {
      name: 'Università di Brescia',
      faculties: {
        DII: {
          name: 'Ingegneria dell\'Informazione (DII)',
          conversion: 110 / 30,
          lodeThreshold: 110,
          includeFinal: false,
          thirtyL: 30,
          weighted: true,
          regulationUrl: 'https://corsi.unibs.it/sites/cdl/files/2023-02/DII_RegolamentoProvaFinaleLT.pdf',
          bonusComponents: [
            {
              id: 'career',
              label: 'Carriera (lodi, esperienze estero, premi)',
              type: 'slider',
              max: 2,
              step: 0.5,
              hint: 'Valutazione discrezionale della commissione: fino a 2 punti.',
            },
            {
              id: 'thesis',
              label: 'Qualità tesi + esposizione',
              type: 'slider',
              max: 4,
              step: 0.5,
              hint: 'Qualità del lavoro di tesi, esposizione e discussione: fino a 4 punti.',
            },
            {
              id: 'duration',
              label: 'Laurea in corso (tempi normali)',
              type: 'checkbox',
              max: 1,
            },
          ],
        },

        DICATAM: {
          name: 'Ingegneria Civile / Architettura (DICATAM)',
          conversion: 110 / 30,
          lodeThreshold: 110,
          includeFinal: true,
          thirtyL: 30,
          weighted: true,
          regulationUrl: 'https://corsi.unibs.it/sites/cdl/files/2024-04/Regolamento%20per%20la%20prova%20finale.pdf',
          bonusComponents: [
            {
              id: 'career',
              label: 'Carriera (durata, lodi, stage extra)',
              type: 'slider',
              max: 3,
              step: 0.5,
            },
            {
              id: 'thesis_quality',
              label: 'Qualità elaborato (proposta relatore)',
              type: 'slider',
              max: 3,
              step: 0.5,
            },
            {
              id: 'presentation',
              label: 'Qualità esposizione e maturità',
              type: 'slider',
              max: 4,
              step: 0.5,
            },
          ],
        },

        MED: {
          name: 'Medicina e Chirurgia LM-41',
          conversion: 1,         // base already in /110
          lodeThreshold: 110,
          includeFinal: false,
          thirtyL: 30,
          weighted: false,
          isMedicine: true,       // special: base is already in /110
          regulationUrl: 'https://corsi.unibs.it/sites/cdl/files/2024-06/Regolamento_Piano2023.pdf',
          bonusComponents: [
            {
              id: 'honours_count',
              label: 'Numero di lodi conseguite',
              type: 'counter',
              max: 10,
              step: 1,
              pointsPerUnit: 0.2,
              capPoints: 2,
              hint: '+0,2 punti per ogni lode, max 2 punti.',
            },
            {
              id: 'progress_test',
              label: 'Progress test sopra la media della coorte',
              type: 'counter',
              max: 5,
              step: 1,
              pointsPerUnit: 0.4,
              capPoints: 2,
              hint: '+0,4 punti per ogni PT sopra la media, max 2 punti.',
            },
            {
              id: 'duration',
              label: 'Durata del corso',
              type: 'discrete',
              options: [
                { label: 'Laurea entro 6 anni', value: 2 },
                { label: 'Laurea entro 7 anni', value: 1 },
                { label: 'Oltre 7 anni', value: 0 },
              ],
            },
            {
              id: 'mobility_months',
              label: 'Mesi di mobilità internazionale (Erasmus)',
              type: 'slider',
              max: 10,
              step: 1,
              pointsPerUnit: 0.2,
              capPoints: 2,
              hint: '+0,2 punti/mese, max 2 punti.',
            },
            {
              id: 'thesis_type',
              label: 'Tipo di tesi',
              type: 'discrete',
              options: [
                { label: 'Tesi di ricerca (max 9 punti)', value: 'research' },
                { label: 'Tesi compilativa (max 5 punti)', value: 'compilative' },
              ],
            },
            {
              id: 'thesis_score',
              label: 'Punteggio tesi',
              type: 'slider',
              max: 9,
              step: 0.5,
              hint: 'Max 9 pt per ricerca, max 5 pt per compilativa.',
            },
          ],
        },

        LAW: {
          name: 'Giurisprudenza LMG/01',
          conversion: 110 / 30,
          lodeThreshold: 110,
          includeFinal: true,
          thirtyL: 30,
          weighted: true,
          regulationUrl: 'https://corsi.unibs.it/sites/cdl/files/2025-06/Regolamento%20didattico%20LM%20C.U.%20-%2025-26.pdf',
          bonusComponents: [],
          bonusNote: 'Il regolamento di prova finale con dettagli numerici non è pubblicamente disponibile. Visualizza il regolamento didattico per dettagli.',
          partial: true,
        },
      },
    },

    custom: {
      name: 'Altro ateneo',
      isCustom: true,
      faculties: {
        CUSTOM: {
          name: 'Configurazione manuale',
          conversion: 110 / 30,
          lodeThreshold: 110,
          includeFinal: false,
          thirtyL: 30,
          weighted: true,
          bonusComponents: [
            {
              id: 'flat_bonus',
              label: 'Punti bonus (stima manuale)',
              type: 'slider',
              max: 10,
              step: 0.5,
            },
          ],
        },
      },
    },
  };

  // ──────────────────────────────────────────────────────────
  // 2. STATE
  // ──────────────────────────────────────────────────────────
  const state = {
    cfu: 120,
    currentAvg: 30,
    futureAvg: 24,
    selectedUniversity: 'unitn',
    selectedDepartment: 'DISI',
    advancedMode: false,
    bonusValues: {},   // { componentId: numericValue }
    thesisGrade: 27,   // for DISI formula
    // custom config overrides (for "Altro ateneo")
    customConversion: 110 / 30,
    customLodeThreshold: 110,
    customBonusMax: 8,
  };

  // ──────────────────────────────────────────────────────────
  // 3. DOM REFS
  // ──────────────────────────────────────────────────────────
  const cfuSliderContainer  = document.getElementById('cfuSliderContainer');
  const cfuSliderFill       = document.getElementById('cfuSliderFill');
  const cfuSliderHandle     = document.getElementById('cfuSliderHandle');
  const cfuDisplay          = document.getElementById('cfuDisplay');
  const cfuRemaining        = document.getElementById('cfuRemaining');
  const currentAvgInput     = document.getElementById('currentAvg');
  const finalVoteBase       = document.getElementById('finalVoteBase');
  const finalVoteEstimated  = document.getElementById('finalVoteEstimated');
  const finalVoteMax        = document.getElementById('finalVoteMax');
  const lodeThresholdEl     = document.getElementById('lodeThreshold');
  const avgSliderContainer  = document.getElementById('avgSliderContainer');
  const avgSliderFill       = document.getElementById('avgSliderFill');
  const avgSliderHandle     = document.getElementById('avgSliderHandle');
  const futureAvgDisplay    = document.getElementById('futureAvgDisplay');

  // ──────────────────────────────────────────────────────────
  // 4. SLIDER LOGIC
  // ──────────────────────────────────────────────────────────
  let cfuDragging = false;
  let avgDragging = false;

  function handleCfuSlider(e) {
    const rect = cfuSliderContainer.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    if (clientX == null) return;
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    state.cfu = Math.round(percent * TOTAL_CFU);
    updateDisplay();
  }

  function handleAvgSlider(e) {
    const rect = avgSliderContainer.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    if (clientX == null) return;
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    state.futureAvg = 18 + percent * 13;
    updateDisplay();
  }

  // CFU slider
  cfuSliderHandle.addEventListener('mousedown', (e) => { cfuDragging = true; e.preventDefault(); });
  cfuSliderHandle.addEventListener('touchstart', (e) => { cfuDragging = true; }, { passive: true });
  cfuSliderContainer.addEventListener('click', handleCfuSlider);

  // Avg slider
  avgSliderHandle.addEventListener('mousedown', (e) => { avgDragging = true; e.preventDefault(); });
  avgSliderHandle.addEventListener('touchstart', (e) => { avgDragging = true; }, { passive: true });
  avgSliderContainer.addEventListener('click', handleAvgSlider);

  // Unified drag move/end on document
  document.addEventListener('mousemove', (e) => {
    if (cfuDragging) handleCfuSlider(e);
    if (avgDragging) handleAvgSlider(e);
  });
  document.addEventListener('touchmove', (e) => {
    if (cfuDragging) { e.preventDefault(); handleCfuSlider(e); }
    if (avgDragging) { e.preventDefault(); handleAvgSlider(e); }
  }, { passive: false });
  document.addEventListener('mouseup', () => { cfuDragging = false; avgDragging = false; });
  document.addEventListener('touchend', () => { cfuDragging = false; avgDragging = false; });

  // ──────────────────────────────────────────────────────────
  // 5. CALCULATION
  // ──────────────────────────────────────────────────────────
  function calculateFinalAvg() {
    const remaining = TOTAL_CFU - state.cfu;
    if (remaining <= 0) return state.currentAvg;
    return (state.currentAvg * state.cfu + state.futureAvg * remaining) / TOTAL_CFU;
  }

  /** Returns the numeric base vote (no bonus) */
  function calcBase(avg, config) {
    if (config.isMedicine) {
      // Medicine: base is already expressed in /110 (avg of exams converted)
      return avg * (110 / 30);
    }
    return avg * config.conversion;
  }

  /** Returns the sum of currently selected bonuses for the active department */
  function calcSelectedBonus(config) {
    if (!config.bonusComponents || config.bonusComponents.length === 0) return 0;

    const dept = config;
    let total = 0;

    for (const comp of dept.bonusComponents) {
      const val = state.bonusValues[comp.id] ?? 0;

      if (comp.type === 'computed') {
        // DISI formula bonus — already stored in bonusValues by recalcDISIBonus()
        total += Number(val) || 0;

      } else if (comp.type === 'thesis_grade') {
        // Not a direct bonus; it's an input that feeds the formula
        continue;

      } else if (comp.type === 'checkbox') {
        total += val ? (comp.max ?? 0) : 0;

      } else if (comp.type === 'discrete') {
        total += Number(val) || 0;

      } else if (comp.type === 'slider') {
        if (comp.pointsPerUnit) {
          const pts = Number(val) * comp.pointsPerUnit;
          total += Math.min(pts, comp.capPoints ?? pts);
        } else {
          total += Number(val) || 0;
        }

      } else if (comp.type === 'counter') {
        const pts = Number(val) * (comp.pointsPerUnit ?? 1);
        total += Math.min(pts, comp.capPoints ?? pts);

      } else if (comp.type === 'flat_bonus') {
        total += Number(val) || 0;
      }
    }

    // Medicina: clamp thesis score by selected thesis type
    if (config.isMedicine) {
      const thesisType = state.bonusValues['thesis_type'] || 'compilative';
      const maxThesis = thesisType === 'research' ? 9 : 5;
      const rawThesis = Number(state.bonusValues['thesis_score']) || 0;
      // thesis_score was already added in the loop; remove excess if type switched
      const addedThesis = Math.min(rawThesis, 9); // slider goes to 9
      const clampedThesis = Math.min(rawThesis, maxThesis);
      total = total - addedThesis + clampedThesis;
    }

    return total;
  }

  /** Returns the theoretical maximum bonus */
  function calcMaxBonus(config) {
    if (!config.bonusComponents || config.bonusComponents.length === 0) return 0;
    let total = 0;
    for (const comp of config.bonusComponents) {
      if (comp.type === 'thesis_grade' || comp.type === 'computed') {
        if (comp.type === 'computed') total += comp.max ?? 0;
        continue;
      }
      if (comp.pointsPerUnit) {
        total += comp.capPoints ?? (comp.max * comp.pointsPerUnit);
      } else {
        const maxVal = comp.type === 'discrete'
          ? Math.max(...comp.options.map(o => isNaN(Number(o.value)) ? 0 : Number(o.value)))
          : (comp.max ?? 0);
        total += maxVal;
      }
    }
    return total;
  }

  /** Recalculate DISI formula bonus and store it */
  function recalcDISIBonus() {
    const avg = calculateFinalAvg();
    const pf = Number(state.thesisGrade) || 18;
    const bonus = ((pf - 18) / 12) * 4 + ((avg - 18) / 12) * 2;
    state.bonusValues['formula_bonus'] = Math.min(Math.max(bonus, 0), 6);
  }

  // ──────────────────────────────────────────────────────────
  // 6. UI UPDATES
  // ──────────────────────────────────────────────────────────
  function updateDisplay() {
    // CFU slider
    const cfuPercent = (state.cfu / TOTAL_CFU) * 100;
    cfuSliderFill.style.width = `${cfuPercent}%`;
    cfuSliderHandle.style.left = `${cfuPercent}%`;
    cfuDisplay.innerHTML = `${state.cfu} <span class="text-gray-400 text-sm">/ 180</span>`;
    cfuRemaining.textContent = state.cfu >= TOTAL_CFU ? 'Completato!' : `${TOTAL_CFU - state.cfu} mancanti`;

    // Future avg slider
    const avgPercent = ((state.futureAvg - 18) / 13) * 100;
    avgSliderFill.style.width = `${avgPercent}%`;
    avgSliderHandle.style.left = `${avgPercent}%`;
    futureAvgDisplay.textContent = state.futureAvg.toFixed(1);

    const config = getCurrentConfig();

    // Recalc DISI computed bonus
    if (state.selectedDepartment === 'DISI') recalcDISIBonus();

    const finalAvg = calculateFinalAvg();
    const base = calcBase(finalAvg, config);
    const selectedBonus = calcSelectedBonus(config);
    const maxBonus = calcMaxBonus(config);

    const voteBase      = Math.round(base);
    const voteEstimated = Math.min(110, Math.round(base + selectedBonus));
    const voteMaxPossible = Math.min(110, Math.round(base + maxBonus));

    if (finalVoteBase)      finalVoteBase.textContent      = voteBase;
    if (finalVoteEstimated) finalVoteEstimated.textContent = voteEstimated;
    if (finalVoteMax)       finalVoteMax.textContent       = voteMaxPossible;
    if (lodeThresholdEl)    lodeThresholdEl.textContent    = config.lodeThreshold;

    // Update badge visibility
    const lodeBadge = document.getElementById('lodeBadge');
    if (lodeBadge) {
      lodeBadge.classList.toggle('hidden', voteMaxPossible < config.lodeThreshold);
    }

    // Update computed DISI bonus display if visible
    const computedEl = document.getElementById('bonus_formula_bonus_display');
    if (computedEl) {
      computedEl.textContent = (state.bonusValues['formula_bonus'] ?? 0).toFixed(2);
    }

    // Update medicine thesis slider max
    if (config.isMedicine) {
      const thesisSlider = document.getElementById('bonus_slider_thesis_score');
      if (thesisSlider) {
        const thesisType = state.bonusValues['thesis_type'] || 'compilative';
        const newMax = thesisType === 'research' ? 9 : 5;
        if (thesisSlider.max !== String(newMax)) {
          thesisSlider.max = newMax;
          if (Number(thesisSlider.value) > newMax) thesisSlider.value = newMax;
          state.bonusValues['thesis_score'] = Number(thesisSlider.value);
          const lbl = document.getElementById('bonus_slider_thesis_score_val');
          if (lbl) lbl.textContent = thesisSlider.value;
        }
      }
    }

    // Update custom config readouts
    updateCustomConfig();

    // Update sticky bar
    updateStickyBar(voteBase, voteEstimated, voteMaxPossible, voteMaxPossible >= config.lodeThreshold);

    renderUniversityCards();
    updateSelectedCourseSummary();
  }

  function getCurrentConfig() {
    const uni = DEPARTMENTS[state.selectedUniversity];
    if (!uni) return DEPARTMENTS.custom.faculties.CUSTOM;
    const cfg = uni.faculties[state.selectedDepartment];
    if (!cfg) return Object.values(uni.faculties)[0];

    // For custom uni, apply state overrides
    if (state.selectedUniversity === 'custom') {
      return {
        ...cfg,
        conversion: state.customConversion,
        lodeThreshold: state.customLodeThreshold,
        bonusComponents: [
          { id: 'flat_bonus', label: 'Punti bonus', type: 'slider', max: state.customBonusMax, step: 0.5 },
        ],
      };
    }
    return cfg;
  }

  // ──────────────────────────────────────────────────────────
  // 7. RENDER UNIVERSITY TABS + DEPT PILLS
  // ──────────────────────────────────────────────────────────

  /** Short pill label per faculty key */
  const DEPT_LABELS = {
    DISI: 'DISI',
    DII_L9: 'Ing. Ind. L9',
    DLM: 'Lettere & Fil.',
    DEM: 'Economia',
    DSRS: 'Sociologia',
    DICAM: 'Ing. Civile',
    DII_LM: 'Ing. Ind. LM',
    MAT: 'Matematica',
    DII: 'Ing. Info.',
    DICATAM: 'Ing. Civile/Arch.',
    MED: 'Medicina',
    LAW: 'Giurisprudenza',
    CUSTOM: 'Configurazione',
  };

  function renderUniversityTabs() {
    const container = document.getElementById('uniTabsRow');
    if (!container) return;
    let html = '';
    Object.entries(DEPARTMENTS).forEach(([uniKey, uni]) => {
      const isActive = state.selectedUniversity === uniKey;
      const icon = uni.isCustom ? 'fa-sliders' : 'fa-graduation-cap';
      html += `<button type="button"
        class="uni-tab flex items-center gap-2 px-4 py-2 rounded-xl border-2 text-sm font-semibold ${isActive ? 'active' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary bg-white'}"
        onclick="window.__calcSelectUniversity('${uniKey}')">
          <i class="fa-solid ${icon} text-xs"></i>${uni.name}
        </button>`;
    });
    container.innerHTML = html;
  }

  function renderDeptPills() {
    const container = document.getElementById('deptPills');
    if (!container) return;
    const uni = DEPARTMENTS[state.selectedUniversity];
    if (!uni) return;
    let html = '';
    Object.entries(uni.faculties).forEach(([deptKey, dept]) => {
      const isActive = state.selectedDepartment === deptKey;
      const label = DEPT_LABELS[deptKey] || dept.name;
      html += `<button type="button"
        class="dept-pill flex-shrink-0 px-4 py-2 rounded-full border text-sm font-medium ${isActive ? 'active border-primary' : 'border-gray-200 text-gray-700 bg-white hover:border-primary hover:text-primary'}"
        onclick="window.__calcSelectDepartment('${state.selectedUniversity}', '${deptKey}')">
          ${label}
        </button>`;
    });
    container.innerHTML = html;
  }

  function renderRegulationLink() {
    const el = document.getElementById('regulationLink');
    if (!el) return;
    const config = getCurrentConfig();
    if (config.regulationUrl) {
      el.innerHTML = `<a href="${config.regulationUrl}" target="_blank" rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-xs text-primary hover:underline font-medium">
        <i class="fa-solid fa-file-pdf"></i>Regolamento ufficiale — ${config.name}
      </a>`;
      el.classList.remove('hidden');
    } else {
      el.innerHTML = '';
      el.classList.add('hidden');
    }
  }

  // ──────────────────────────────────────────────────────────
  // 8. RENDER BONUS SECTION (always visible)
  // ──────────────────────────────────────────────────────────
  function renderBonusSection() {
    const container = document.getElementById('bonusSection');
    if (!container) return;
    const config = getCurrentConfig();

    // Custom university — show config fields
    if (state.selectedUniversity === 'custom') {
      container.innerHTML = renderCustomConfigFields();
      return;
    }

    if (!config.bonusComponents || config.bonusComponents.length === 0) {
      container.innerHTML = `<p class="text-sm text-gray-400 italic py-3">${config.bonusNote || 'Nessun bonus previsto per questo corso.'}</p>`;
      return;
    }

    let html = '';

    if (config.partial) {
      html += `<div class="mt-3 mb-2 p-3 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-700">
        <i class="fa-solid fa-triangle-exclamation mr-1"></i><strong>Dati parziali:</strong> ${config.bonusNote || 'Alcune informazioni di questo corso non sono state estratte completamente dal regolamento.'}
      </div>`;
    } else if (config.bonusNote) {
      html += `<div class="mt-3 mb-2 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
        <i class="fa-solid fa-circle-info mr-1"></i>${config.bonusNote}
      </div>`;
    }

    // Medicina: group by A / B / C blocks
    if (config.isMedicine) {
      const groupA = config.bonusComponents.filter(c => ['honours_count', 'progress_test'].includes(c.id));
      const groupB = config.bonusComponents.filter(c => ['duration', 'mobility_months'].includes(c.id));
      const groupC = config.bonusComponents.filter(c => ['thesis_type', 'thesis_score'].includes(c.id));

      html += renderBonusGroup('A — Media, Lodi e Progress Test', groupA, config);
      html += renderBonusGroup('B — Durata e Mobilità', groupB, config);
      html += renderBonusGroup('C — Tesi', groupC, config);
    } else {
      for (const comp of config.bonusComponents) {
        html += renderBonusComponent(comp, config);
      }
    }

    container.innerHTML = html;
    attachBonusListeners(config);
  }

  function renderBonusGroup(title, components, config) {
    if (components.length === 0) return '';
    let html = `<div class="mb-2 mt-4">
      <p class="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-1">${title}</p>`;
    for (const comp of components) {
      html += renderBonusComponent(comp, config);
    }
    html += '</div>';
    return html;
  }

  function renderCustomConfigFields() {
    return `<div class="grid md:grid-cols-3 gap-4">
      <div>
        <label class="text-xs font-semibold text-gray-600 block mb-1">Fattore di conversione</label>
        <input type="number" id="customConversion" value="${state.customConversion.toFixed(4)}" step="0.0001" min="1" max="5"
          class="w-full py-2 px-3 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-primary"
          oninput="window.__calcUpdateCustom()">
        <p class="text-xs text-gray-400 mt-1">Es. 3.6667 = 110/30</p>
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-600 block mb-1">Bonus massimo (punti)</label>
        <input type="number" id="customBonusMax" value="${state.customBonusMax}" step="1" min="0" max="20"
          class="w-full py-2 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
          oninput="window.__calcUpdateCustom()">
      </div>
      <div>
        <label class="text-xs font-semibold text-gray-600 block mb-1">Soglia lode</label>
        <input type="number" id="customLodeThreshold" value="${state.customLodeThreshold}" step="0.5" min="100" max="115"
          class="w-full py-2 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
          oninput="window.__calcUpdateCustom()">
        <p class="text-xs text-gray-400 mt-1">Solitamente 110 o 111</p>
      </div>
    </div>
    <div class="mt-4 bg-gray-50 rounded-xl p-4">
      <label class="text-xs font-semibold text-gray-600 block mb-2">Bonus stimato (punti)</label>
      <input type="range" id="bonus_slider_flat_bonus" value="${state.bonusValues['flat_bonus'] ?? 0}" min="0" max="${state.customBonusMax}" step="0.5"
        class="w-full accent-primary"
        oninput="window.__calcBonusSlider('flat_bonus', this.value, false, 0)">
      <div class="flex justify-between text-xs text-gray-400 mt-1">
        <span>0</span><span id="bonus_slider_flat_bonus_val">${state.bonusValues['flat_bonus'] ?? 0} pt</span><span>max ${state.customBonusMax} pt</span>
      </div>
    </div>`;
  }

  // ──────────────────────────────────────────────────────────
  // 9. BONUS COMPONENT RENDERER (unchanged, referenced above)
  // ──────────────────────────────────────────────────────────
  function updateCustomConfig() {
    const convEl = document.getElementById('customConversion');
    const bonusMaxEl = document.getElementById('customBonusMax');
    const lodeEl = document.getElementById('customLodeThreshold');
    if (convEl && !isNaN(parseFloat(convEl.value))) state.customConversion = parseFloat(convEl.value);
    if (bonusMaxEl && !isNaN(parseInt(bonusMaxEl.value))) state.customBonusMax = parseInt(bonusMaxEl.value);
    if (lodeEl && !isNaN(parseFloat(lodeEl.value))) state.customLodeThreshold = parseFloat(lodeEl.value);
  }

  function renderBonusComponent(comp, config) {
    const hintHtml = comp.hint
      ? `<p class="text-xs text-gray-400 mt-1">${comp.hint}</p>`
      : '';

    if (comp.type === 'thesis_grade') {
      const val = state.thesisGrade ?? 27;
      return `
        <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <label class="text-sm font-medium text-gray-700">${comp.label}</label>
          <div class="flex items-center gap-2">
            <button type="button" class="w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all flex items-center justify-center"
              onclick="window.__calcAdjustThesisGrade(-1)">−</button>
            <input type="number" id="thesisGradeInput" value="${val}" min="18" max="31" step="1"
              class="w-16 h-10 text-xl font-bold text-center bg-white rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-primary-dark"
              oninput="window.__calcThesisGradeInput(this.value)">
            <button type="button" class="w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all flex items-center justify-center"
              onclick="window.__calcAdjustThesisGrade(1)">+</button>
            <span class="text-xs text-gray-400">(31 = 30L)</span>
          </div>
        </div>`;
    }

    if (comp.type === 'computed') {
      const val = (state.bonusValues[comp.id] ?? 0).toFixed(2);
      return `
        <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div>
            <span class="text-sm font-medium text-gray-700">${comp.label}</span>
            ${hintHtml}
          </div>
          <div class="flex items-center gap-1 flex-shrink-0 ml-4">
            <span class="text-xl font-bold text-primary" id="bonus_formula_bonus_display">${val}</span>
            <span class="text-gray-400 text-xs">/ ${comp.max}</span>
          </div>
        </div>`;
    }

    if (comp.type === 'checkbox') {
      const checked = state.bonusValues[comp.id] ? 'checked' : '';
      return `
        <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <label for="bonus_cb_${comp.id}" class="text-sm font-medium text-gray-700 cursor-pointer flex-1 mr-4">
            ${comp.label}
            <span class="text-xs font-semibold text-primary ml-1">+${comp.max} pt</span>
            ${hintHtml}
          </label>
          <input type="checkbox" id="bonus_cb_${comp.id}" ${checked}
            class="w-5 h-5 text-primary rounded border-gray-300 cursor-pointer accent-primary flex-shrink-0"
            onchange="window.__calcBonusChange('${comp.id}', this.checked ? 1 : 0)">
        </div>`;
    }

    if (comp.type === 'discrete') {
      const options = comp.options.map(o =>
        `<option value="${o.value}" ${String(state.bonusValues[comp.id]) === String(o.value) ? 'selected' : ''}>${o.label}</option>`
      ).join('');
      const maxVal = Math.max(...comp.options.map(o => isNaN(Number(o.value)) ? 0 : Number(o.value)));
      return `
        <div class="py-3 border-b border-gray-100 last:border-0">
          <div class="flex items-baseline justify-between mb-2">
            <label class="text-sm font-medium text-gray-700">${comp.label}</label>
            ${maxVal > 0 ? `<span class="text-xs text-gray-400 font-medium flex-shrink-0 ml-2">max +${maxVal} pt</span>` : ''}
          </div>
          <select id="bonus_sel_${comp.id}"
            class="w-full py-2 px-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary"
            onchange="window.__calcBonusChange('${comp.id}', this.value)">
            ${options}
          </select>
          ${hintHtml}
        </div>`;
    }

    if (comp.type === 'slider') {
      const val = state.bonusValues[comp.id] ?? 0;
      const displayVal = comp.pointsPerUnit
        ? Math.min(Number(val) * comp.pointsPerUnit, comp.capPoints ?? 99).toFixed(1) + ' pt'
        : `${val} pt`;
      return `
        <div class="py-3 border-b border-gray-100 last:border-0">
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-medium text-gray-700">${comp.label}</label>
            <span class="text-sm font-bold text-primary" id="bonus_slider_${comp.id}_val">${displayVal}</span>
          </div>
          <input type="range" id="bonus_slider_${comp.id}" value="${val}" min="0" max="${comp.max}" step="${comp.step ?? 0.5}"
            class="w-full h-2 rounded-full accent-primary cursor-pointer"
            oninput="window.__calcBonusSlider('${comp.id}', this.value, ${!!comp.pointsPerUnit}, ${comp.capPoints ?? 0})">
          <div class="flex justify-between text-xs text-gray-400 mt-1">
            <span>0</span><span>max ${comp.pointsPerUnit ? comp.capPoints : comp.max} pt</span>
          </div>
          ${hintHtml}
        </div>`;
    }

    if (comp.type === 'counter') {
      const val = state.bonusValues[comp.id] ?? 0;
      const pts = Math.min(Number(val) * comp.pointsPerUnit, comp.capPoints).toFixed(1);
      return `
        <div class="py-3 border-b border-gray-100 last:border-0">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium text-gray-700">${comp.label}
              <span class="text-xs text-gray-400 ml-1">max +${comp.capPoints} pt</span>
            </label>
            <span class="text-sm text-primary font-semibold" id="bonus_counter_${comp.id}_pts">= ${pts} pt</span>
          </div>
          <div class="flex items-center gap-3">
            <button type="button" class="w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all flex items-center justify-center"
              onclick="window.__calcCounterAdj('${comp.id}', -1, ${comp.max}, ${comp.pointsPerUnit}, ${comp.capPoints})">−</button>
            <span class="text-xl font-bold text-primary-dark w-8 text-center" id="bonus_counter_${comp.id}_val">${val}</span>
            <button type="button" class="w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all flex items-center justify-center"
              onclick="window.__calcCounterAdj('${comp.id}', 1, ${comp.max}, ${comp.pointsPerUnit}, ${comp.capPoints})">+</button>
          </div>
          ${hintHtml}
        </div>`;
    }

    return '';
  }

  function attachBonusListeners(config) {
    config.bonusComponents?.forEach(comp => {
      if (comp.type === 'discrete' && state.bonusValues[comp.id] === undefined) {
        state.bonusValues[comp.id] = comp.options[0]?.value ?? 0;
      }
    });
  }

  // ──────────────────────────────────────────────────────────
  // 10. RENDER UNIVERSITY CARDS (replaces renderResults)
  // ──────────────────────────────────────────────────────────
  function renderUniversityCards() {
    const container = document.getElementById('uniCoursesSection');
    if (!container) return;
    const finalAvg = calculateFinalAvg();
    let html = '';

    Object.entries(DEPARTMENTS).forEach(([uniKey, uni]) => {
      const isActiveUni = state.selectedUniversity === uniKey;
      const icon = uni.isCustom ? 'fa-sliders' : 'fa-graduation-cap';
      html += `<div class="border rounded-xl overflow-hidden ${isActiveUni ? 'border-primary/40' : 'border-gray-200'}"`;
      html += ` style="background:white">`;
      html += `<div class="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <i class="fa-solid ${icon} text-primary text-xs"></i>
        <span class="font-semibold text-gray-700 text-sm">${uni.name}</span>
      </div>`;
      html += `<div class="divide-y divide-gray-50">`;

      Object.entries(uni.faculties).forEach(([deptKey, deptConfig]) => {
        const isActive = isActiveUni && state.selectedDepartment === deptKey;
        const base = Math.round(calcBase(finalAvg, deptConfig));
        const maxVote = Math.min(110, Math.round(calcBase(finalAvg, deptConfig) + calcMaxBonus(deptConfig)));
        const canLode = maxVote >= deptConfig.lodeThreshold;
        const partialMark = deptConfig.partial ? ` <span class="text-[10px] opacity-50">(~)</span>` : '';

        html += `<button type="button"
          class="w-full flex items-center justify-between px-4 py-2.5 text-left transition-all ${isActive ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-gray-50'}"
          onclick="window.__calcSelectDepartment('${uniKey}', '${deptKey}')">
          <span class="text-sm ${isActive ? 'text-primary font-semibold' : 'text-gray-600'}">${deptConfig.name}${partialMark}</span>
          <span class="flex items-center gap-1.5 text-xs flex-shrink-0 ml-2">
            <span class="font-mono ${isActive ? 'text-primary' : 'text-gray-400'}">${base}–${maxVote}</span>
            ${canLode ? `<span class="text-yellow-400">★</span>` : ''}
          </span>
        </button>`;
      });

      html += `</div></div>`;
    });

    container.innerHTML = html;
  }

  function scrollToBonusSection() {
    const el = document.getElementById('resultHero');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderDropdownSelectors() {
    const uniSelect = document.getElementById('uniSelect');
    const deptSelect = document.getElementById('deptSelect');
    if (!uniSelect || !deptSelect) return;

    // Populate university dropdown
    uniSelect.innerHTML = Object.entries(DEPARTMENTS).map(([key, uni]) =>
      `<option value="${key}"${state.selectedUniversity === key ? ' selected' : ''}>${uni.name}</option>`
    ).join('');

    // Populate department dropdown for selected university
    const uni = DEPARTMENTS[state.selectedUniversity];
    if (uni) {
      deptSelect.innerHTML = Object.entries(uni.faculties).map(([key, dept]) =>
        `<option value="${key}"${state.selectedDepartment === key ? ' selected' : ''}>${dept.name}</option>`
      ).join('');
    }
  }

  function updateSelectedCourseSummary() {
    const uniSelect = document.getElementById('uniSelect');
    const deptSelect = document.getElementById('deptSelect');
    const uni = DEPARTMENTS[state.selectedUniversity];

    // Sync university select value
    if (uniSelect && uniSelect.value !== state.selectedUniversity) {
      uniSelect.value = state.selectedUniversity;
    }

    // Repopulate and sync department select
    if (deptSelect && uni) {
      const currentOptions = Array.from(deptSelect.options).map(o => o.value);
      const newOptions = Object.keys(uni.faculties);
      const needsRepopulate = currentOptions.join(',') !== newOptions.join(',');
      if (needsRepopulate) {
        deptSelect.innerHTML = Object.entries(uni.faculties).map(([key, dept]) =>
          `<option value="${key}">${dept.name}</option>`
        ).join('');
      }
      deptSelect.value = state.selectedDepartment;
    }
  }

  // ──────────────────────────────────────────────────────────
  // 11. STICKY BAR (IntersectionObserver)
  // ──────────────────────────────────────────────────────────
  function initStickyBar() {
    const stickyBar = document.getElementById('stickyBar');
    const sentinel = document.getElementById('finalVoteEstimated');
    if (!stickyBar || !sentinel || !window.IntersectionObserver) return;

    const obs = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;
      if (isVisible) {
        stickyBar.classList.remove('visible');
      } else {
        stickyBar.classList.add('visible');
      }
    }, { threshold: 0 });

    obs.observe(sentinel);
  }

  function updateStickyBar(voteBase, voteEstimated, voteMax, canLode) {
    const sb = document.getElementById('stickyBase');
    const se = document.getElementById('stickyEstimated');
    const sm = document.getElementById('stickyMax');
    const sl = document.getElementById('stickyLodeBadge');
    if (sb) sb.textContent = voteBase;
    if (se) se.textContent = voteEstimated;
    if (sm) sm.textContent = voteMax;
    if (sl) sl.classList.toggle('hidden', !canLode);
  }

  // ──────────────────────────────────────────────────────────
  // 12. GLOBAL CALLBACKS
  // ──────────────────────────────────────────────────────────
  window.__calcSelectUniversity = function (uniKey) {
    const uni = DEPARTMENTS[uniKey];
    if (!uni) return;
    state.selectedUniversity = uniKey;
    state.selectedDepartment = Object.keys(uni.faculties)[0];
    state.bonusValues = {};
    renderRegulationLink();
    initBonusDefaults(getCurrentConfig());
    renderBonusSection();
    updateDisplay();
    updateSelectedCourseSummary();
    scrollToBonusSection();
  };

  window.__calcSelectDepartment = function (uniKey, deptKey) {
    state.selectedUniversity = uniKey;
    state.selectedDepartment = deptKey;
    state.bonusValues = {};
    renderRegulationLink();
    initBonusDefaults(getCurrentConfig());
    renderBonusSection();
    updateDisplay();
    updateSelectedCourseSummary();
    scrollToBonusSection();
  };

  window.__calcToggleCourseSelector = function () { /* no-op: removed card panel */ };

  window.__calcToggleAdvanced = function () {
    const fields = document.getElementById('advancedFields');
    const chevron = document.getElementById('advancedChevron');
    if (!fields) return;
    const isHidden = fields.classList.contains('hidden');
    if (isHidden) {
      fields.classList.remove('hidden');
      fields.classList.add('grid');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      state.advancedMode = true;
    } else {
      fields.classList.add('hidden');
      fields.classList.remove('grid');
      if (chevron) chevron.style.transform = '';
      state.advancedMode = false;
    }
  };

  window.__calcUpdateCustom = function () {
    updateCustomConfig();
    renderBonusSection();
    updateDisplay();
  };

  window.adjustCurrentAvg = function (delta) {
    const current = parseFloat(currentAvgInput.value) || 18;
    const newVal = Math.max(18, Math.min(31, current + delta));
    currentAvgInput.value = newVal.toFixed(1);
    state.currentAvg = newVal;
    updateDisplay();
  };

  window.__calcBonusChange = function (id, value) {
    state.bonusValues[id] = value;
    updateDisplay();
  };

  window.__calcBonusSlider = function (id, value, hasPointsPerUnit, capPoints) {
    state.bonusValues[id] = Number(value);
    const comp = getCurrentConfig().bonusComponents?.find(c => c.id === id);
    const labelEl = document.getElementById(`bonus_slider_${id}_val`);
    if (labelEl) {
      if (hasPointsPerUnit && comp) {
        const pts = Math.min(Number(value) * comp.pointsPerUnit, comp.capPoints ?? 99);
        labelEl.textContent = pts.toFixed(1) + ' pt';
      } else {
        labelEl.textContent = `${value} pt`;
      }
    }
    updateDisplay();
  };

  window.__calcCounterAdj = function (id, delta, max, pointsPerUnit, capPoints) {
    const current = Number(state.bonusValues[id] ?? 0);
    const newVal = Math.max(0, Math.min(max, current + delta));
    state.bonusValues[id] = newVal;
    const valEl = document.getElementById(`bonus_counter_${id}_val`);
    const ptsEl = document.getElementById(`bonus_counter_${id}_pts`);
    if (valEl) valEl.textContent = newVal;
    if (ptsEl) ptsEl.textContent = `= ${Math.min(newVal * pointsPerUnit, capPoints).toFixed(1)} pt`;
    updateDisplay();
  };

  window.__calcThesisGradeInput = function (value) {
    state.thesisGrade = Math.max(18, Math.min(31, Number(value) || 18));
    updateDisplay();
  };

  window.__calcAdjustThesisGrade = function (delta) {
    const input = document.getElementById('thesisGradeInput');
    if (!input) return;
    const newVal = Math.max(18, Math.min(31, (Number(input.value) || 18) + delta));
    input.value = newVal;
    state.thesisGrade = newVal;
    updateDisplay();
  };

  // ──────────────────────────────────────────────────────────
  // 13. INPUT LISTENERS
  // ──────────────────────────────────────────────────────────
  currentAvgInput.addEventListener('input', () => {
    const val = parseFloat(currentAvgInput.value);
    if (!isNaN(val)) {
      state.currentAvg = Math.max(18, Math.min(31, val));
    }
    updateDisplay();
  });

  // ──────────────────────────────────────────────────────────
  // 14. INIT
  // ──────────────────────────────────────────────────────────
  function initBonusDefaults(config) {
    config.bonusComponents?.forEach(comp => {
      if (state.bonusValues[comp.id] === undefined) {
        if (comp.type === 'discrete') state.bonusValues[comp.id] = comp.options[0]?.value ?? 0;
        else if (comp.type === 'slider' || comp.type === 'counter') state.bonusValues[comp.id] = 0;
        else if (comp.type === 'checkbox') state.bonusValues[comp.id] = 0;
      }
    });
  }

  initBonusDefaults(getCurrentConfig());
  renderRegulationLink();
  renderBonusSection();
  renderDropdownSelectors();
  updateDisplay();
  updateSelectedCourseSummary();
  initStickyBar();

  // Dropdown change listeners
  const uniSelectEl = document.getElementById('uniSelect');
  const deptSelectEl = document.getElementById('deptSelect');
  if (uniSelectEl) {
    uniSelectEl.addEventListener('change', function () {
      window.__calcSelectUniversity(this.value);
    });
  }
  if (deptSelectEl) {
    deptSelectEl.addEventListener('change', function () {
      window.__calcSelectDepartment(state.selectedUniversity, this.value);
    });
  }

}); // end DOMContentLoaded
