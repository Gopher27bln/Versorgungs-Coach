import { Document } from '../types';

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Arztbrief Orthopädie',
    date: '12.01.2026',
    type: 'Arztbrief',
    content: `Sehr geehrte Kolleginnen und Kollegen,

wir berichten über den o.g. Patienten, der sich am 10.01.2026 in unserer orthopädischen Sprechstunde vorstellte.

Diagnose: Lumboischialgie bei Bandscheibenprotrusion L4/L5

Anamnese: Der Patient klagt seit ca. 3 Wochen über Schmerzen im unteren Rückenbereich mit Ausstrahlung in das linke Bein. Die Beschwerden verstärken sich beim Sitzen und Bücken.

Befund: Druckschmerz paravertebral lumbal links, positives Lasègue-Zeichen links bei 45°, keine sensomotorischen Defizite.

Therapieempfehlung:
- Physiotherapie (KG) 2x wöchentlich für 6 Wochen
- NSAR bei Bedarf (Ibuprofen 600mg)
- Wiedervorstellung in 4 Wochen zur Verlaufskontrolle

Mit freundlichen Grüßen,
Dr. med. M. Schmidt
Facharzt für Orthopädie`
  },
  {
    id: '2',
    title: 'Laborbefund Blutwerte',
    date: '03.11.2025',
    type: 'Laborbefund',
    content: `Labormedizinische Untersuchung

Entnahmedatum: 03.11.2025
Material: Serum, EDTA-Blut

Ergebnisse:
- Hämoglobin: 14,2 g/dl (Referenz: 12-16)
- Leukozyten: 7.200 /µl (Referenz: 4.000-10.000)
- Thrombozyten: 245.000 /µl (Referenz: 150.000-400.000)
- Glucose nüchtern: 98 mg/dl (Referenz: 70-100)
- HbA1c: 5,4 % (Referenz: <5,7)
- Cholesterin gesamt: 212 mg/dl (Referenz: <200)
- LDL-Cholesterin: 138 mg/dl (Referenz: <130)
- HDL-Cholesterin: 52 mg/dl (Referenz: >40)
- Triglyceride: 145 mg/dl (Referenz: <150)

Beurteilung: Leicht erhöhtes Gesamtcholesterin und LDL. Empfehlung zur Ernährungsberatung.

Dr. med. K. Weber
Labormedizin`
  },
  {
    id: '3',
    title: 'Impfbescheinigung COVID-19',
    date: '15.09.2024',
    type: 'Impfbescheinigung',
    content: `Impfbescheinigung

Impfung gegen: COVID-19
Impfstoff: Comirnaty (BioNTech/Pfizer)
Chargennummer: FJ5929

Impfdatum: 15.09.2024
Impfung Nr.: 4 (2. Auffrischungsimpfung)

Die Impfung wurde ordnungsgemäß durchgeführt.

Impfende Stelle: Hausarztpraxis Dr. Müller
Stempel und Unterschrift`
  }
];

export const coachResponses = {
  greeting: (docTitle: string, docDate: string) => 
    `Guten Tag! Sie schauen sich gerade den ${docTitle} vom ${docDate} an. Ich bin Ihr Versorgungs-Coach und kann Ihnen in einfachen Worten erklären, worum es in diesem Dokument geht und welche nächsten Schritte für Sie sinnvoll sein könnten. Wie kann ich Ihnen helfen?`,
  
  todoResponse: `Basierend auf Ihrem Dokument empfehle ich folgende nächste Schritte:

1. **Kontrolltermin vereinbaren**: Rufen Sie in der Praxis an und vereinbaren Sie den empfohlenen Wiedervorstellungstermin.

2. **Physiotherapie-Rezept einlösen**: Falls Sie ein Rezept erhalten haben, suchen Sie sich zeitnah eine Physiotherapie-Praxis in Ihrer Nähe.

3. **Unterlagen aufbewahren**: Speichern Sie dieses Dokument in Ihrer ePA, damit es bei zukünftigen Arztbesuchen verfügbar ist.

Kann ich Ihnen bei einem dieser Punkte weiterhelfen?`,

  summaryResponse: `Ich fasse die wichtigsten Punkte für Sie zusammen:

Das Dokument enthält medizinische Informationen zu Ihrer Behandlung. Die wesentlichen Aspekte sind die Diagnose, die durchgeführten Untersuchungen und die empfohlenen weiteren Maßnahmen.

Möchten Sie, dass ich einen bestimmten Teil genauer erkläre?`,

  genericResponses: [
    'Das ist eine gute Frage. Lassen Sie mich das für Sie erläutern: Die im Dokument genannten Befunde sind typische Standarduntersuchungen. Haben Sie dazu noch spezifische Fragen?',
    'Ich verstehe Ihr Anliegen. In Ihrem Dokument geht es um wichtige Gesundheitsinformationen. Soll ich Ihnen die medizinischen Begriffe in einfacher Sprache erklären?',
    'Gerne helfe ich Ihnen weiter. Die Informationen in diesem Dokument sind für Ihre weitere Behandlung relevant. Gibt es einen bestimmten Abschnitt, der Ihnen unklar ist?',
    'Das kann ich nachvollziehen. Medizinische Dokumente sind oft komplex. Ich bin hier, um Ihnen alles verständlich zu erklären. Was genau möchten Sie wissen?'
  ],

  advisorGreeting: 'Guten Tag, hier ist Ihr BARMER-Kundenberater. Ich habe die Informationen zu Ihrem Anliegen erhalten und stehe Ihnen jetzt persönlich zur Verfügung. Wie kann ich Ihnen weiterhelfen?'
};
