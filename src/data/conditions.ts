import { Condition } from '../types';

interface SymptomConditionMap {
  keywords: string[];
  conditions: Condition[];
}

export const symptomDatabase: SymptomConditionMap[] = [
  {
    keywords: ['headache', 'head pain', 'migraine', 'head hurts', 'head ache'],
    conditions: [
      {
        name: 'Tension Headache',
        probability: 'High',
        severity: 'Mild',
        description: 'A common type of headache characterized by a dull, aching pain and tightness around the forehead or back of the head.',
        recommendations: ['Rest in a quiet, dark room', 'Apply a cold or warm compress', 'Over-the-counter pain relievers', 'Stay hydrated', 'Practice relaxation techniques'],
        symptoms: ['Dull aching head pain', 'Tightness across forehead', 'Tenderness in scalp and neck']
      },
      {
        name: 'Migraine',
        probability: 'Moderate',
        severity: 'Moderate',
        description: 'A neurological condition causing intense, debilitating headaches often accompanied by nausea, sensitivity to light and sound.',
        recommendations: ['Consult a healthcare provider', 'Track triggers in a diary', 'Rest in a dark quiet room', 'Prescribed medications may be needed'],
        symptoms: ['Throbbing pain', 'Nausea', 'Light sensitivity', 'Visual disturbances']
      },
      {
        name: 'Sinusitis',
        probability: 'Low',
        severity: 'Mild',
        description: 'Inflammation of the sinuses that can cause headache, facial pain, and nasal congestion.',
        recommendations: ['Nasal decongestants', 'Steam inhalation', 'Warm compress on face', 'See doctor if symptoms persist over 10 days'],
        symptoms: ['Facial pressure', 'Nasal congestion', 'Post-nasal drip']
      }
    ]
  },
  {
    keywords: ['fever', 'high temperature', 'chills', 'feeling hot', 'burning up'],
    conditions: [
      {
        name: 'Viral Infection',
        probability: 'High',
        severity: 'Mild',
        description: 'A common infection caused by a virus, resulting in fever, body aches, and fatigue.',
        recommendations: ['Rest and stay hydrated', 'Take fever-reducing medication', 'Monitor temperature', 'Seek care if fever exceeds 103°F (39.4°C)'],
        symptoms: ['Elevated temperature', 'Body aches', 'Fatigue', 'Chills']
      },
      {
        name: 'Influenza (Flu)',
        probability: 'Moderate',
        severity: 'Moderate',
        description: 'A respiratory illness caused by influenza viruses, often more severe than the common cold.',
        recommendations: ['Rest and fluids', 'Antiviral medications within 48 hours', 'Over-the-counter symptom relief', 'Seek emergency care for severe symptoms'],
        symptoms: ['High fever', 'Severe body aches', 'Cough', 'Extreme fatigue']
      },
      {
        name: 'Bacterial Infection',
        probability: 'Low',
        severity: 'Serious',
        description: 'An infection caused by bacteria that may require antibiotic treatment.',
        recommendations: ['See a healthcare provider promptly', 'May need antibiotics', 'Complete full course of prescribed treatment', 'Monitor for worsening symptoms'],
        symptoms: ['Persistent fever', 'Localized pain', 'Swelling', 'Discharge']
      }
    ]
  },
  {
    keywords: ['cough', 'coughing', 'throat', 'sore throat', 'scratchy throat'],
    conditions: [
      {
        name: 'Common Cold',
        probability: 'High',
        severity: 'Mild',
        description: 'A viral infection of the upper respiratory tract causing cough, sore throat, and congestion.',
        recommendations: ['Rest and drink plenty of fluids', 'Honey and warm liquids for throat', 'Over-the-counter cold medications', 'Use a humidifier'],
        symptoms: ['Cough', 'Sore throat', 'Runny nose', 'Mild body aches']
      },
      {
        name: 'Pharyngitis',
        probability: 'Moderate',
        severity: 'Mild',
        description: 'Inflammation of the pharynx (back of the throat), causing sore throat and difficulty swallowing.',
        recommendations: ['Warm salt water gargles', 'Throat lozenges', 'Soft foods', 'See doctor if symptoms last more than a week'],
        symptoms: ['Sore throat', 'Difficulty swallowing', 'Swollen glands']
      },
      {
        name: 'Bronchitis',
        probability: 'Low',
        severity: 'Moderate',
        description: 'Inflammation of the bronchial tubes, causing a persistent cough that may produce mucus.',
        recommendations: ['Rest and fluids', 'Use a humidifier', 'Over-the-counter cough suppressants', 'See doctor if cough lasts more than 3 weeks'],
        symptoms: ['Persistent cough', 'Mucus production', 'Chest discomfort', 'Fatigue']
      }
    ]
  },
  {
    keywords: ['stomach', 'nausea', 'vomiting', 'belly', 'abdominal pain', 'stomachache', 'tummy'],
    conditions: [
      {
        name: 'Gastroenteritis',
        probability: 'High',
        severity: 'Mild',
        description: 'Also known as "stomach flu," an inflammation of the stomach and intestines usually caused by a virus.',
        recommendations: ['Stay hydrated with clear fluids', 'BRAT diet (bananas, rice, applesauce, toast)', 'Avoid dairy and fatty foods', 'Seek care if unable to keep fluids down'],
        symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach cramps']
      },
      {
        name: 'Food Poisoning',
        probability: 'Moderate',
        severity: 'Moderate',
        description: 'Illness caused by eating contaminated food, leading to nausea, vomiting, and diarrhea.',
        recommendations: ['Hydrate with small sips of water', 'Rest the stomach', 'Avoid solid foods initially', 'Seek emergency care if bloody stool or high fever'],
        symptoms: ['Sudden nausea', 'Vomiting', 'Diarrhea', 'Abdominal cramps']
      },
      {
        name: 'Appendicitis',
        probability: 'Low',
        severity: 'Critical',
        description: 'Inflammation of the appendix causing severe abdominal pain, typically starting near the navel and moving to the lower right.',
        recommendations: ['SEEK IMMEDIATE MEDICAL ATTENTION', 'Do not eat or drink', 'Do not take pain relievers without doctor advice', 'Go to emergency room'],
        symptoms: ['Sharp pain in lower right abdomen', 'Nausea', 'Fever', 'Loss of appetite']
      }
    ]
  },
  {
    keywords: ['chest pain', 'chest tight', 'chest pressure', 'heart', 'palpitations', 'chest hurts'],
    conditions: [
      {
        name: 'Anxiety/Panic Attack',
        probability: 'Moderate',
        severity: 'Moderate',
        description: 'Intense anxiety episodes that can cause chest tightness, rapid heartbeat, and shortness of breath.',
        recommendations: ['Practice deep breathing exercises', 'Ground yourself with 5-4-3-2-1 technique', 'Seek mental health support', 'Rule out cardiac causes with a doctor'],
        symptoms: ['Chest tightness', 'Racing heart', 'Shortness of breath', 'Sweating']
      },
      {
        name: 'Gastroesophageal Reflux (GERD)',
        probability: 'Moderate',
        severity: 'Mild',
        description: 'Acid reflux that can cause burning chest pain (heartburn) often mistaken for heart problems.',
        recommendations: ['Avoid trigger foods', 'Dont lie down after eating', 'Over-the-counter antacids', 'See doctor for persistent symptoms'],
        symptoms: ['Burning chest pain', 'Acid taste', 'Difficulty swallowing', 'Pain worse after eating']
      },
      {
        name: 'Cardiac Event',
        probability: 'Low',
        severity: 'Critical',
        description: 'Chest pain can indicate a serious heart condition. Immediate evaluation is essential.',
        recommendations: ['CALL 911 IMMEDIATELY if severe', 'Chew an aspirin if available', 'Do not drive yourself', 'Note time symptoms started'],
        symptoms: ['Crushing chest pain', 'Pain radiating to arm/jaw', 'Shortness of breath', 'Cold sweat']
      }
    ]
  },
  {
    keywords: ['rash', 'skin', 'itching', 'itchy', 'hives', 'bumps', 'spots'],
    conditions: [
      {
        name: 'Contact Dermatitis',
        probability: 'High',
        severity: 'Mild',
        description: 'A skin reaction caused by contact with an irritant or allergen, resulting in an itchy, red rash.',
        recommendations: ['Identify and avoid the trigger', 'Apply calamine lotion or hydrocortisone cream', 'Take antihistamines for itching', 'See doctor if rash spreads or blisters'],
        symptoms: ['Red rash', 'Itching', 'Dry or cracked skin', 'Blisters in severe cases']
      },
      {
        name: 'Allergic Reaction',
        probability: 'Moderate',
        severity: 'Moderate',
        description: 'An immune response to an allergen causing skin symptoms like hives, itching, and swelling.',
        recommendations: ['Take an antihistamine', 'Apply cool compress', 'Avoid known allergens', 'Seek emergency care if difficulty breathing'],
        symptoms: ['Hives', 'Itching', 'Swelling', 'Redness']
      },
      {
        name: 'Eczema (Atopic Dermatitis)',
        probability: 'Low',
        severity: 'Mild',
        description: 'A chronic skin condition causing dry, itchy, inflamed patches of skin.',
        recommendations: ['Moisturize regularly', 'Use gentle, fragrance-free products', 'Prescription creams may be needed', 'Avoid hot showers'],
        symptoms: ['Dry patches', 'Intense itching', 'Red or brownish patches', 'Thickened skin']
      }
    ]
  },
  {
    keywords: ['tired', 'fatigue', 'exhausted', 'no energy', 'sleepy', 'weak', 'weakness'],
    conditions: [
      {
        name: 'Sleep Deprivation',
        probability: 'High',
        severity: 'Mild',
        description: 'Insufficient or poor quality sleep leading to daytime fatigue and reduced cognitive function.',
        recommendations: ['Establish a regular sleep schedule', 'Limit screen time before bed', 'Create a comfortable sleep environment', 'Aim for 7-9 hours of sleep'],
        symptoms: ['Daytime sleepiness', 'Difficulty concentrating', 'Irritability', 'Reduced motivation']
      },
      {
        name: 'Iron Deficiency Anemia',
        probability: 'Moderate',
        severity: 'Moderate',
        description: 'A condition where the blood lacks adequate healthy red blood cells due to insufficient iron.',
        recommendations: ['Get blood work done', 'Increase iron-rich foods', 'Consider iron supplements', 'See a healthcare provider'],
        symptoms: ['Persistent fatigue', 'Pale skin', 'Shortness of breath', 'Cold hands and feet']
      },
      {
        name: 'Thyroid Disorder',
        probability: 'Low',
        severity: 'Moderate',
        description: 'An underactive thyroid (hypothyroidism) can cause fatigue, weight gain, and depression.',
        recommendations: ['Get thyroid function tests', 'See an endocrinologist', 'May need medication', 'Regular follow-up required'],
        symptoms: ['Chronic fatigue', 'Weight changes', 'Temperature sensitivity', 'Hair thinning']
      }
    ]
  },
  {
    keywords: ['back pain', 'back hurts', 'lower back', 'spine', 'backache'],
    conditions: [
      {
        name: 'Muscle Strain',
        probability: 'High',
        severity: 'Mild',
        description: 'Overstretching or tearing of muscles in the back, often from heavy lifting or sudden movements.',
        recommendations: ['Apply ice for first 48 hours, then heat', 'Over-the-counter pain relievers', 'Gentle stretching', 'Avoid heavy lifting'],
        symptoms: ['Localized pain', 'Muscle stiffness', 'Pain with movement', 'Muscle spasms']
      },
      {
        name: 'Herniated Disc',
        probability: 'Low',
        severity: 'Moderate',
        description: 'A condition where the soft center of a spinal disc pushes through a crack in the tougher exterior.',
        recommendations: ['See a doctor for imaging', 'Physical therapy', 'Pain management', 'Surgery may be needed in severe cases'],
        symptoms: ['Radiating pain to legs', 'Numbness or tingling', 'Muscle weakness', 'Pain worse with certain movements']
      },
      {
        name: 'Sciatica',
        probability: 'Moderate',
        severity: 'Moderate',
        description: 'Pain that radiates along the sciatic nerve, from the lower back through the hips and down each leg.',
        recommendations: ['Alternate ice and heat', 'Stretching exercises', 'See a physical therapist', 'See doctor if pain is severe or persistent'],
        symptoms: ['Shooting pain down leg', 'Lower back pain', 'Numbness in leg', 'Weakness in affected leg']
      }
    ]
  },
  {
    keywords: ['dizzy', 'dizziness', 'lightheaded', 'vertigo', 'faint', 'fainting', 'spinning'],
    conditions: [
      {
        name: 'Dehydration',
        probability: 'High',
        severity: 'Mild',
        description: 'Insufficient fluid intake causing dizziness, dry mouth, and reduced urine output.',
        recommendations: ['Drink water and electrolyte solutions', 'Avoid caffeine and alcohol', 'Rest in a cool place', 'Seek care if unable to keep fluids down'],
        symptoms: ['Dizziness', 'Dry mouth', 'Dark urine', 'Fatigue']
      },
      {
        name: 'Benign Positional Vertigo (BPPV)',
        probability: 'Moderate',
        severity: 'Mild',
        description: 'Brief episodes of dizziness related to changes in head position, caused by displaced inner ear crystals.',
        recommendations: ['Epley maneuver exercises', 'Move slowly when changing positions', 'See an ENT specialist', 'Usually resolves on its own'],
        symptoms: ['Spinning sensation', 'Triggered by head movement', 'Nausea', 'Balance problems']
      },
      {
        name: 'Low Blood Pressure',
        probability: 'Low',
        severity: 'Moderate',
        description: 'Blood pressure lower than normal, which can cause dizziness especially when standing up.',
        recommendations: ['Stand up slowly', 'Increase salt and fluid intake', 'Wear compression stockings', 'See a doctor for evaluation'],
        symptoms: ['Dizziness when standing', 'Blurred vision', 'Nausea', 'Fainting']
      }
    ]
  },
  {
    keywords: ['breathing', 'breath', 'shortness of breath', 'cant breathe', 'wheezing', 'asthma'],
    conditions: [
      {
        name: 'Asthma',
        probability: 'High',
        severity: 'Moderate',
        description: 'A chronic condition causing airway inflammation, leading to wheezing, breathlessness, and coughing.',
        recommendations: ['Use prescribed inhaler', 'Identify and avoid triggers', 'See a pulmonologist', 'Have an action plan for attacks'],
        symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing at night']
      },
      {
        name: 'Anxiety-Related Dyspnea',
        probability: 'Moderate',
        severity: 'Mild',
        description: 'Difficulty breathing caused by anxiety or panic, often accompanied by hyperventilation.',
        recommendations: ['Practice slow, deep breathing', 'Try box breathing technique', 'Address underlying anxiety', 'Rule out other causes with a doctor'],
        symptoms: ['Feeling of air hunger', 'Rapid breathing', 'Tingling in hands', 'Chest tightness']
      },
      {
        name: 'Pneumonia',
        probability: 'Low',
        severity: 'Serious',
        description: 'An infection that inflames air sacs in the lungs, which may fill with fluid.',
        recommendations: ['See a doctor immediately', 'Chest X-ray may be needed', 'Antibiotics if bacterial', 'Rest and stay hydrated'],
        symptoms: ['Difficulty breathing', 'Fever with chills', 'Productive cough', 'Chest pain when breathing']
      }
    ]
  }
];

export function analyzeSymptoms(input: string): Condition[] {
  const lowered = input.toLowerCase();
  const matchedConditions: Condition[] = [];
  const seenNames = new Set<string>();

  for (const entry of symptomDatabase) {
    const hasMatch = entry.keywords.some(keyword => lowered.includes(keyword));
    if (hasMatch) {
      for (const condition of entry.conditions) {
        if (!seenNames.has(condition.name)) {
          seenNames.add(condition.name);
          matchedConditions.push(condition);
        }
      }
    }
  }

  if (matchedConditions.length === 0) {
    return [
      {
        name: 'Unable to Determine',
        probability: 'Low',
        severity: 'Mild',
        description: 'Based on the symptoms described, we could not match a specific condition. This does not mean nothing is wrong.',
        recommendations: [
          'Please provide more specific symptoms',
          'Consider consulting a healthcare professional',
          'If symptoms are severe, seek immediate medical attention',
          'Try describing the location and type of pain or discomfort'
        ],
        symptoms: []
      }
    ];
  }

  return matchedConditions;
}

export function generateAIResponse(input: string): string {
  const conditions = analyzeSymptoms(input);
  
  if (conditions[0].name === 'Unable to Determine') {
    return "I understand you're not feeling well. Could you describe your symptoms in more detail? For example, tell me about any pain (where and what type), fever, nausea, fatigue, or other specific symptoms you're experiencing. The more details you provide, the better I can help assess your situation.";
  }

  const hasCritical = conditions.some(c => c.severity === 'Critical');
  const topConditions = conditions.slice(0, 3);
  
  let response = "Based on your symptoms, here are some possible conditions I've identified:\n\n";
  
  topConditions.forEach((c, i) => {
    response += `${i + 1}. **${c.name}** (${c.probability} likelihood, ${c.severity} severity)\n`;
    response += `   ${c.description}\n\n`;
  });

  if (hasCritical) {
    response += "⚠️ **IMPORTANT:** Some of these conditions could be serious. Please seek immediate medical attention if your symptoms are severe or worsening.\n\n";
  }

  response += "Would you like more details about any of these conditions, or would you like to find nearby medical facilities?";
  
  return response;
}
