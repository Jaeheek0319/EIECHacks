import { EHRField, SampleCase } from '../types';

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: 'case-cardiology',
    name: 'Cardiology Intake Profile',
    description: 'Adult patient presenting with chest discomfort and mild exertion palpitations.',
    blankFormName: 'standard_cardiology_intake.jpg',
    formType: 'Cardiovascular Assessment Form Standard v4.2',
    transcription: `Dr. Miller: Good afternoon, Mr. Henderson. I reviewed your intake checklist. Can you tell me what brings you in today?

Patient: Yes, doctor. Lately, I've been feeling some chest discomfort, mostly a dull ache, and occasional mild palpitations. It seems to happen when I'm walking up a steep incline or climbing stairs.

Dr. Miller: I see. How long has this chest tightness been occurring?

Patient: About three weeks now. The chest tightness goes away after about five minutes of rest, but the heart fluttering can linger a bit longer. No pain radiating down my arm, though.

Dr. Miller: Okay, and does anything else accompany this? Any shortness of breath or dizziness?

Patient: A little bit of shortness of breath, but no extreme dizziness or passing out.

Dr. Miller: Understood. Let's look at your vitals and run an EKG. Your blood pressure is stable today at 134 over 82, and heart rate is 78. However, the symptoms are suspicious of early cardiac ischemia or mild ischemic heart disease. My initial working diagnosis is intermittent sinus tachycardia with suspected mild stable angina on exertion.

Patient: Oh, wow. Is that treatable with medicine?

Dr. Miller: Extremely treatable. First, we will schedule a treadmill stress electrocardiogram within the next 10 days to get a clearer picture of your cardiac performance under load. As for medication, I'm prescribing you Metoprolol Succinate, 25 milligrams daily, to stabilize your heart rate and prevent angina. I also want you to start taking a low-dose Aspirin, 81 milligrams, once every morning.

Patient: Okay, Metoprolol 25mg daily and Aspirin 81mg. Got it. Do I need to make any immediate changes?

Dr. Miller: Absolutely. Avoid high-caffeine beverages like energy drinks or strong espresso, as they can trigger the arrhythmias, and avoid intense strenuous lifting until we complete the stress test. Let's do a follow-up consultation in exactly two weeks.`,
    expectedFields: [
      {
        id: 'patient_name',
        label: 'Patient Name',
        value: 'Mr. Robert Henderson',
        confidence: 98,
        evidence: 'Dr. Miller: Good afternoon, Mr. Henderson. I reviewed your intake checklist...'
      },
      {
        id: 'date_of_visit',
        label: 'Date of Visit',
        value: 'May 30, 2026',
        confidence: 95,
        evidence: 'Automatically inferred from encounter session logs.'
      },
      {
        id: 'symptoms',
        label: 'Chief Complaint & Symptoms',
        value: 'Chest discomfort (dull ache) and occasional mild palpitations/fluttering on exertion (climbing stairs/steep incline) lasting about 5 minutes, accompanied by mild shortness of breath.',
        confidence: 94,
        evidence: 'Patient: "...chest discomfort, mostly a dull ache, and occasional mild palpitations. It seems to happen when I\'m walking up a steep incline..."'
      },
      {
        id: 'diagnosis',
        label: 'Diagnosis',
        value: 'Intermittent sinus tachycardia with suspected mild stable angina on exertion.',
        confidence: 96,
        evidence: 'Dr. Miller: "...My initial working diagnosis is intermittent sinus tachycardia with suspected mild stable angina on exertion."'
      },
      {
        id: 'medication',
        label: 'Prescribed Medications',
        value: '1. Metoprolol Succinate 25mg orally once daily.\n2. Aspirin (low-dose) 81mg orally once every morning.',
        confidence: 97,
        evidence: 'Dr. Miller: "I\'m prescribing you Metoprolol Succinate, 25 milligrams daily... start taking a low-dose Aspirin, 81 milligrams, once every morning."'
      },
      {
        id: 'followup_instructions',
        label: 'Follow-up Instructions & Plan',
        value: '1. Schedule a treadmill stress electrocardiogram (EKG) within 10 days.\n2. Avoid high-caffeine beverages (energy drinks, double espressos).\n3. Avoid strenuous heavy lifting.\n4. Follow-up clinic appointment in 2 weeks.',
        confidence: 92,
        evidence: 'Dr. Miller: "...schedule a treadmill stress electrocardiogram within the next 10 days... Avoid high-caffeine beverages... follow-up consultation in exactly two weeks."'
      }
    ]
  },
  {
    id: 'case-pediatrics',
    name: 'Pediatric Acute Illness Encounter',
    description: '6-year-old child with fever, dry barking cough, and runny nose.',
    blankFormName: 'blank_pediatric_encounter_form.webp',
    formType: 'PediaExpress Clinical Intake Sheet Rev 2',
    transcription: `Dr. Sarah Jenkins: Hi Noah! And hello Mrs. Thompson. What seems to be going on with Noah today?

Mrs. Thompson: Well, Noah woke up yesterday morning with a very runny nose, and last night he developed a high fever. It spiked up to 101.8 degrees. But what's really worrying us is this dry, barking cough. It sounds like a seal when he coughs.

Dr. Sarah Jenkins: Let's take a quick listen. Yes, that is a classic stridor with an active croup-like presentation. His throat is clear, his chest sounds are bilaterally clean with no wheezing, but his subglottic airway has mild inflammation. The vital logs show his oxygen saturation is fantastic at 98% on room air.

Noah: My throat feels itchy, doctor.

Dr. Sarah Jenkins: I know, Noah, you're being super brave. Based on the barking cough and his fever of 101.8, my diagnosis is mild croup combined with a viral upper respiratory infection.

Mrs. Thompson: Oh, poor thing. What can we do to help him breathe easier?

Dr. Sarah Jenkins: Since it's mild croup, we don't need to hospitalize him. I am giving Noah a single dose of oral liquid Dexamethasone 3 milligrams right here in the clinic to quickly reduce the windpipe swelling. For use at home, I want you to give him Children's Tylenol (Acetaminophen), 160 milligrams, every 4 to 6 hours as needed to manage his fever and general throat discomfort.

Mrs. Thompson: Understood. Tylenol 160mg every 4 to 6 hours, plus the steroid dose he got here today.

Dr. Sarah Jenkins: Exactly. For instructions at home: Keep Noah well-hydrated with clear juices and water, run a cool-mist humidifier in his bedroom overnight, and if he has another coughing spasm, take him out into the cold night air or sit with him in a steamy bathroom for 10 minutes. If he displays severe chest pulling, blue lips, or if his fever persists over 72 hours, call us immediately or head to the ER. Otherwise, just monitor him.`,
    expectedFields: [
      {
        id: 'patient_name',
        label: 'Patient Name',
        value: 'Noah Thompson',
        confidence: 99,
        evidence: 'Dr. Sarah Jenkins: "Hi Noah! And hello Mrs. Thompson..."'
      },
      {
        id: 'date_of_visit',
        label: 'Date of Visit',
        value: 'May 29, 2026',
        confidence: 92,
        evidence: 'Inferred from local EHR clinic admission timestamps.'
      },
      {
        id: 'symptoms',
        label: 'Chief Complaint & Symptoms',
        value: 'Runny nose starting yesterday morning, fever peaking at 101.8°F, dry seal-like barking cough (stridor), and itchy throat.',
        confidence: 95,
        evidence: 'Mrs. Thompson: "...runny nose, and last night he developed a high fever. It spiked up to 101.8 degrees. But what\'s really worrying us is this dry, barking cough. It sounds like a seal..."'
      },
      {
        id: 'diagnosis',
        label: 'Diagnosis',
        value: 'Mild croup and concurrent viral upper respiratory tract infection (URI).',
        confidence: 96,
        evidence: 'Dr. Sarah Jenkins: "...my diagnosis is mild croup combined with a viral upper respiratory infection."'
      },
      {
        id: 'medication',
        label: 'Prescribed Medications',
        value: '1. Oral liquid Dexamethasone 3mg, single dose (administered in-clinic).\n2. Children\'s Tylenol (Acetaminophen) 160mg orally every 4-6 hours as needed for fever and discomfort.',
        confidence: 97,
        evidence: 'Dr. Sarah Jenkins: "...giving Noah a single dose of oral liquid Dexamethasone 3 milligrams right here in the clinic... give him Children\'s Tylenol, 160 milligrams, every 4 to 6 hours as needed..."'
      },
      {
        id: 'followup_instructions',
        label: 'Follow-up Instructions & Plan',
        value: '1. Maintain high fluid intake (clear juices, water) for hydration.\n2. Run cool-mist bedroom humidifier overnight.\n3. Implement cold night air or warm steam bathroom therapy (10 mins) during active coughing spasms.\n4. Seek immediate ER/urgent care if severe chest pulling or cyanosis (blue lips) occurs.\n5. Follow up if fever lasts longer than 72 hours.',
        confidence: 94,
        evidence: 'Dr. Sarah Jenkins: "...Keep Noah well-hydrated... run a cool-mist humidifier... take him out into the cold night air or sit with him in a steamy bathroom... if fever persists over 72 hours, call us..."'
      }
    ]
  },
  {
    id: 'case-orthopedics',
    name: 'Orthopedic Post-Op Evaluation',
    description: 'Routine 2-week post-op checkup for arthroscopic ACL reconstruction.',
    blankFormName: 'ortho_recovery_tracker.png',
    formType: 'Orthopedic Post-Surgical Log Rev B',
    transcription: `Dr. Cole: Welcome back, Gillian. It's been exactly two weeks since your arthroscopic ACL reconstruction on your left knee. How has the recovery been going?

Patient: Hi, Dr. Cole. Overall, it's getting better day by day. The severe pain has subsided. Right now, it's just a dull postseason ache, maybe a 4 out of 10. The swelling in the left knee has gone down a lot, but there's still a noticeable puffiness.

Dr. Cole: The incisions look beautiful. No redness, drainage, or sign of infection. Your range of motion is expanding wonderfully; we're at 95 degrees of flexion today, which is exactly where I want you. Let's make sure you continue outpatient physical therapy sessions. Are you still participating in those three times per week?

Patient: Yes, my therapist is excellent. We've been working on leg lifts and quad contraction.

Dr. Cole: Splendid. So my official assessment is normal postoperative healing progress, status 14 days post left knee arthroscopic ACL reconstruction with stable graft integrity.

Patient: That's a relief! What about my painkillers? I have some leftover oxycodone, but it makes me feel very groggy and constipated.

Dr. Cole: Excellent, you should stop taking the Oxycodone. Let's discontinue that opioid right away. Instead, manage any remaining dull ache with standard Ibuprofen 600mg every 8 hours as needed.

Patient: Great, I will stick to Ibuprofen 600mg PRN.

Dr. Cole: Perfect. For instructions: Keep the surgical site clean and dry. Avoid taking deep baths or soaking the knee in water yet; quick showers with a waterproof sleeve are safe. Continue wearing your hinged knee range-of-motion brace locked in full extension whenever you are walking around, and keep doing your physical therapy three times a week. Let's schedule your next check-up in 4 weeks.`,
    expectedFields: [
      {
        id: 'patient_name',
        label: 'Patient Name',
        value: 'Gillian Vance',
        confidence: 97,
        evidence: 'Dr. Cole: "Welcome back, Gillian..."'
      },
      {
        id: 'date_of_visit',
        label: 'Date of Visit',
        value: 'May 28, 2026',
        confidence: 90,
        evidence: 'Inferred from consultation database.'
      },
      {
        id: 'symptoms',
        label: 'Chief Complaint & Symptoms',
        value: 'Status 2-weeks post left-knee ACL reconstruction. Subjective postoperative pain is a dull ache rated 4/10. Mild, persistent left knee swelling/puffiness.',
        confidence: 94,
        evidence: 'Patient: "...dull postseason ache, maybe a 4 out of 10. The swelling in the left knee has gone down a lot..."'
      },
      {
        id: 'diagnosis',
        label: 'Diagnosis',
        value: 'Normal healing and recovery progress 14 days post-op arthroscopic left knee ACL reconstruction.',
        confidence: 96,
        evidence: 'Dr. Cole: "...assessment is normal postoperative healing progress, status 14 days post left knee arthroscopic ACL reconstruction..."'
      },
      {
        id: 'medication',
        label: 'Prescribed Medications',
        value: '1. Discontinue leftover Oxycodone (prescription opioids).\n2. Ibuprofen 600mg orally every 8 hours as needed for pain relief.',
        confidence: 95,
        evidence: 'Dr. Cole: "...stop taking the Oxycodone... manage any remaining dull ache with standard Ibuprofen 600mg every 8 hours as needed."'
      },
      {
        id: 'followup_instructions',
        label: 'Follow-up Instructions & Plan',
        value: '1. Discontinue opioid pain medication (Oxycodone).\n2. Maintain outpatient physical therapy sessions 3 times per week.\n3. Keep incision clean and dry (avoid direct water immersion or baths, use waterproof sleeves in showers).\n4. Wear the hinged range-of-motion knee brace locked in full extension when ambulating.\n5. Next postoperative follow-up visit in 4 weeks.',
        confidence: 95,
        evidence: 'Dr. Cole: "Keep the surgical site clean and dry... Continue wearing your hinged knee range-of-motion brace... schedule your next check-up in 4 weeks."'
      }
    ]
  }
];

/**
 * Placeholder extraction function required by system instructions.
 * This is designed with exact TODOs and structure so the developer can
 * easily integrate a server-side or frontend Gemini API call.
 * 
 * @param formImage The blank EHR form image (File, string URL, or null)
 * @param transcriptionText Medical transcription text inputted or loaded by the user
 */
export async function extractEHRFields(
  formImage: File | string | null,
  transcriptionText: string
): Promise<EHRField[]> {
  // Simulate network or computation delay
  await new Promise((resolve) => setTimeout(resolve, 3600));

  // =========================================================================
  // TODO: Add AI model/API call here
  // This function should take the EHR form image and transcription as input
  // It should return extracted fields matched with transcript evidence
  //
  // For Gemini SDK Integration, you would do something like:
  // 
  // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  // const response = await ai.models.generateContent({
  //   model: 'gemini-2.5-flash',
  //   contents: [
  //     { text: "Read this transcription and fill in the fields mapped from this image." },
  //     { inlineData: { mimeType: "image/jpeg", data: formImageData } },
  //     { text: transcriptionText }
  //   ]
  // });
  // =========================================================================

  // If the user pasted custom text, we will do a smart heuristic matching 
  // or return a dynamic set of fields, or fallback to an empty default template
  // depending on whether they used one of our pre-configured cases.
  
  const textLower = transcriptionText.toLowerCase();
  
  if (textLower.includes('henderson') || textLower.includes('metoprolol') || textLower.includes('angina')) {
    return JSON.parse(JSON.stringify(SAMPLE_CASES[0].expectedFields));
  } else if (textLower.includes('noah') || textLower.includes('croup') || textLower.includes('sarah')) {
    return JSON.parse(JSON.stringify(SAMPLE_CASES[1].expectedFields));
  } else if (textLower.includes('gillian') || textLower.includes('acl') || textLower.includes('knee')) {
    return JSON.parse(JSON.stringify(SAMPLE_CASES[2].expectedFields));
  }

  // If it's a completely custom user input, extract some basic fields with reasonable fallbacks
  const inferredName = extractRegex(transcriptionText, /(?:patient|mr\.|ms\.|dr\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/) || 'Not found in transcript';
  const inferredDiagnosis = extractRegex(transcriptionText, /(?:diagnosis is|diagnose with|assessment is)\s+([^.\n]+)/i) || 'Not found in transcript';
  const inferredMedication = extractRegex(transcriptionText, /(?:prescribing|prescribe|taking|cough medicine|dose of|mg of)\s+([^.\n]+)/i) || 'Not found in transcript';
  
  const symptomsKeywords: string[] = [];
  if (textLower.includes('cough')) symptomsKeywords.push('cough');
  if (textLower.includes('fever')) symptomsKeywords.push('fever');
  if (textLower.includes('pain')) symptomsKeywords.push('pain');
  if (textLower.includes('breathing') || textLower.includes('breath')) symptomsKeywords.push('shortness of breath');
  if (textLower.includes('headache')) symptomsKeywords.push('headache');
  
  const inferredSymptoms = symptomsKeywords.length > 0 
    ? `Patient complained of: ${symptomsKeywords.join(', ')}.` 
    : 'Not found in transcript';

  return [
    {
      id: 'patient_name',
      label: 'Patient Name',
      value: inferredName !== 'Not found in transcript' ? inferredName : 'Not found in transcript',
      confidence: inferredName !== 'Not found in transcript' ? 88 : 0,
      evidence: inferredName !== 'Not found in transcript' 
        ? `Found surrounding name patterns: "${transcriptionText.substring(Math.max(0, transcriptionText.indexOf(inferredName) - 30), Math.min(transcriptionText.length, transcriptionText.indexOf(inferredName) + 50))}"`
        : 'No matching transcript evidence found.'
    },
    {
      id: 'date_of_visit',
      label: 'Date of Visit',
      value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      confidence: 75,
      evidence: 'Generated using current clinic capture date.'
    },
    {
      id: 'symptoms',
      label: 'Chief Complaint & Symptoms',
      value: inferredSymptoms,
      confidence: inferredSymptoms !== 'Not found in transcript' ? 85 : 0,
      evidence: inferredSymptoms !== 'Not found in transcript'
        ? `Mention of clinical symptoms detected in discussion.`
        : 'No matching transcript evidence found.'
    },
    {
      id: 'diagnosis',
      label: 'Diagnosis',
      value: inferredDiagnosis !== 'Not found in transcript' ? inferredDiagnosis : 'Not found in transcript',
      confidence: inferredDiagnosis !== 'Not found in transcript' ? 80 : 0,
      evidence: inferredDiagnosis !== 'Not found in transcript'
        ? `Direct sentence alignment: "${inferredDiagnosis}"`
        : 'No matching transcript evidence found.'
    },
    {
      id: 'medication',
      label: 'Prescribed Medications',
      value: inferredMedication !== 'Not found in transcript' ? inferredMedication : 'Not found in transcript',
      confidence: inferredMedication !== 'Not found in transcript' ? 82 : 0,
      evidence: inferredMedication !== 'Not found in transcript'
        ? `Prescription terminology reference matched: "${inferredMedication}"`
        : 'No matching transcript evidence found.'
    },
    {
      id: 'followup_instructions',
      label: 'Follow-up Instructions & Plan',
      value: textLower.includes('follow-up') || textLower.includes('weeks') || textLower.includes('days')
        ? 'Schedule follow-up visit based on timelines mentioned in discussion.'
        : 'Not found in transcript',
      confidence: textLower.includes('follow-up') || textLower.includes('weeks') ? 70 : 0,
      evidence: textLower.includes('follow-up')
        ? 'Clinic review instructions mentioned in context.'
        : 'No matching transcript evidence found.'
    }
  ];
}

function extractRegex(text: string, regex: RegExp): string | null {
  const match = text.match(regex);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}
