import React, { useEffect, useRef, useState } from 'react';
import { CloseIcon } from './icons';

const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm VPA (Veripill Personal Assistant), your AI-powered medicine information assistant. I can provide general information about common over-the-counter medicines, their uses, and potential side effects. How can I assist you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    const disclaimer = "\n\n**⚠️ Important Disclaimer:** I am VPA, an AI assistant, not a medical professional. This information is not a substitute for professional medical advice. Please consult with a doctor or pharmacist for a proper diagnosis and treatment plan tailored to you.";

    if (/(hello|hi|hey|greetings)/.test(lowerInput)) {
      return "Hello there! I'm VPA, your virtual pharmacy assistant. I'm here to provide you with reliable information about medications, their uses, and potential side effects. Remember, I'm not a substitute for professional medical advice. How can I help you today?";
    }
    if (lowerInput.includes('how are you')) {
      return "I'm functioning optimally, thank you for asking! I'm here to provide you with reliable information about medications. What would you like to know about today?";
    }
    if (/(thank|thanks)/.test(lowerInput)) {
      return "You're very welcome! I'm happy to help. Is there anything else you'd like to know about medications or health?";
    }
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return "I can provide general information about:\n\n- Common over-the-counter medications\n- Their uses and active ingredients\n- Potential side effects and interactions\n- General guidance on when to consult a healthcare professional\n\nFeel free to ask me about specific medications or health concerns!";
    }

    if (/(fever|temperature)/.test(lowerInput)) {
      return `✅ **1. Fever**\n\n**Cause:** Infection, viral or bacterial.\n\n**Medication:**\n- Paracetamol (acetaminophen)\n- Ibuprofen (for inflammation and pain)\n- Stay hydrated, rest\n\n**Important:**\n- Stay hydrated when you have a fever\n- Rest is important for recovery\n- For infants and children, always use age-appropriate formulations and dosages\n- Consult a healthcare provider if fever is high (above 103°F/39.4°C for adults), lasts more than three days, or is accompanied by severe symptoms` + disclaimer;
    }

    if (/(cold|flu)/.test(lowerInput)) {
      return `✅ **2. Cold / Flu**\n\n**Cause:** Viral infections.\n\n**Medication:**\n- Paracetamol / Ibuprofen for fever and pain\n- Antihistamines (e.g. cetirizine) for runny nose, sneezing\n- Decongestants (e.g. pseudoephedrine) for blocked nose\n- Cough syrups (with dextromethorphan or guaifenesin)\n\n**Important:**\n- Choose medications that target your specific symptoms\n- Avoid multi-symptom products if you only need relief for one or two symptoms\n- Rest and hydration are essential for recovery` + disclaimer;
    }

    if (lowerInput.includes('headache')) {
      return `✅ **3. Headache**\n\n**Cause:** Stress, dehydration, sinus, migraine.\n\n**Medication:**\n- Paracetamol\n- Ibuprofen\n- Aspirin (avoid in children)\n\n**Important:**\n- Identify potential triggers for your headaches\n- Stay hydrated\n- For frequent or severe headaches, consult a healthcare provider` + disclaimer;
    }

    if (/(body ache|muscle pain|muscle)/.test(lowerInput)) {
      return `✅ **4. Body Ache / Muscle Pain**\n\n**Cause:** Flu, strain, injury.\n\n**Medication:**\n- Ibuprofen or naproxen\n- Muscle relaxants (in severe cases)\n- Topical gels (diclofenac)\n\n**Important:**\n- Rest the affected area\n- Apply ice for acute injuries\n- Apply heat for muscle tension\n- Consult a healthcare provider for severe or persistent pain` + disclaimer;
    }

    if (/(stomach|indigestion|heartburn|acid)/.test(lowerInput)) {
      return `✅ **5. Stomach Ache / Indigestion**\n\n**Cause:** Gas, acidity, infection.\n\n**Medication:**\n- Antacids (e.g. calcium carbonate)\n- Proton pump inhibitors (e.g. omeprazole)\n- Antispasmodics (e.g. hyoscine)\n\n**Important:**\n- Avoid trigger foods (spicy, fatty, acidic foods)\n- Eat smaller, more frequent meals\n- Don't lie down immediately after eating\n- Consult a healthcare provider if symptoms persist` + disclaimer;
    }

    if (lowerInput.includes('diarrhea')) {
      return `✅ **6. Diarrhea**\n\n**Cause:** Infection, contaminated food.\n\n**Medication:**\n- Oral rehydration salts (ORS)\n- Loperamide (to reduce stool frequency)\n- Zinc supplements for children\n\n**Important:**\n- Stay hydrated by drinking plenty of fluids\n- Eat bland foods (BRAT diet: bananas, rice, applesauce, toast)\n- Avoid dairy products, fatty foods, and spicy foods\n- Consult a healthcare provider if diarrhea is severe, bloody, or lasts more than 2-3 days` + disclaimer;
    }

    if (lowerInput.includes('constipation')) {
      return `✅ **7. Constipation**\n\n**Cause:** Lack of fiber, dehydration.\n\n**Medication:**\n- Laxatives (e.g. lactulose, polyethylene glycol)\n- Fiber supplements\n- Increased water intake\n\n**Important:**\n- Increase fiber intake gradually\n- Exercise regularly\n- Establish a regular bathroom routine\n- Consult a healthcare provider if constipation is severe or persistent` + disclaimer;
    }

    if (/(allerg|allergy)/.test(lowerInput)) {
      return `✅ **8. Allergies (Skin or Respiratory)**\n\n**Cause:** Pollen, dust, food, etc.\n\n**Medication:**\n- Antihistamines (cetirizine, loratadine)\n- Corticosteroid creams for skin inflammation\n- Nasal sprays (fluticasone)\n\n**Important:**\n- Identify and avoid allergens when possible\n- Keep windows closed during high pollen seasons\n- Use air purifiers\n- For severe allergies, consider allergy testing and immunotherapy` + disclaimer;
    }

    if (/(skin|rash|rashes)/.test(lowerInput)) {
      return `✅ **9. Skin Infections / Rashes**\n\n**Cause:** Bacterial, fungal, or viral infections.\n\n**Medication:**\n- Antibiotic creams (mupirocin)\n- Antifungal creams (clotrimazole, ketoconazole)\n- Antiseptic washes\n\n**Important:**\n- Keep the affected area clean and dry\n- Avoid scratching to prevent further irritation or infection\n- Consult a healthcare provider for proper diagnosis, especially if the rash is spreading or worsening` + disclaimer;
    }

    if (/(sore throat|throat)/.test(lowerInput)) {
      return `✅ **10. Sore Throat**\n\n**Cause:** Infection, dry air, strain.\n\n**Medication:**\n- Lozenges (menthol, benzocaine)\n- Gargle with warm salt water\n- Paracetamol for pain\n\n**Important:**\n- Stay hydrated\n- Use a humidifier to add moisture to the air\n- Avoid irritants like smoking\n- Consult a healthcare provider if sore throat is severe or lasts more than a week` + disclaimer;
    }

    if (lowerInput.includes('cough')) {
      return `✅ **11. Cough**\n\n**Cause:** Viral infection, irritation.\n\n**Medication:**\n- Cough suppressants (dextromethorphan)\n- Expectorants (guaifenesin)\n- Steam inhalation\n\n**Important:**\n- Stay hydrated\n- Honey can help soothe a cough (not for children under 1 year)\n- Use a humidifier\n- Consult a healthcare provider if cough lasts more than a week, is severe, or is accompanied by other concerning symptoms` + disclaimer;
    }

    if (lowerInput.includes('anemia')) {
      return `✅ **12. Anemia**\n\n**Cause:** Iron deficiency, poor diet.\n\n**Medication:**\n- Iron supplements (ferrous sulfate)\n- Vitamin B12 and folic acid supplements\n\n**Important:**\n- Eat iron-rich foods (red meat, poultry, beans, lentils)\n- Vitamin C helps with iron absorption\n- Consult a healthcare provider for proper diagnosis and treatment` + disclaimer;
    }

    if (/(hypertension|high blood pressure|blood pressure)/.test(lowerInput)) {
      return `✅ **14. Hypertension (High Blood Pressure)**\n\n**Cause:** Lifestyle, genetics.\n\n**Medication:**\n- ACE inhibitors (enalapril)\n- Beta-blockers (atenolol)\n- Diuretics (hydrochlorothiazide)\n\n**Important:**\n- Reduce sodium intake\n- Maintain a healthy weight\n- Exercise regularly\n- Limit alcohol consumption\n- Avoid tobacco\n- Regular monitoring of blood pressure\n- This requires ongoing medical management` + disclaimer;
    }

    if (/(anxiety|depression|stress)/.test(lowerInput)) {
      return `✅ **15. Anxiety / Depression**\n\n**Cause:** Stress, chemical imbalance.\n\n**Medication:**\n- SSRIs (fluoxetine, sertraline)\n- Benzodiazepines (short term use only)\n- Therapy and counseling\n\n**Important:**\n- Practice stress management techniques\n- Regular exercise\n- Adequate sleep\n- Healthy diet\n- Social support\n- This condition requires professional medical and psychological support` + disclaimer;
    }

    if (/(injuries|cuts|bruises|wound)/.test(lowerInput)) {
      return `✅ **16. Minor Injuries (Cuts, Bruises)**\n\n**Cause:** Accidents.\n\n**Medication:**\n- Antiseptic solutions (povidone iodine)\n- Bandages\n- Pain relievers like ibuprofen\n\n**Important:**\n- Clean wounds thoroughly with antiseptic\n- Keep wounds covered and clean\n- Change dressings regularly\n- Watch for signs of infection (redness, swelling, pus)\n- Seek medical attention for deep wounds or signs of infection` + disclaimer;
    }

    if (/(insomnia|sleep|sleeping)/.test(lowerInput)) {
      return `✅ **17. Insomnia**\n\n**Cause:** Stress, anxiety.\n\n**Medication:**\n- Melatonin supplements\n- Sleep aids (short-term use only, e.g., zolpidem)\n- Lifestyle changes\n\n**Important:**\n- Establish a regular sleep schedule\n- Create a relaxing bedtime routine\n- Limit screen time before bed\n- Avoid caffeine and alcohol before bedtime\n- Make sure your sleep environment is comfortable\n- Consult a healthcare provider if insomnia persists` + disclaimer;
    }

    if (/(eye|dry eyes)/.test(lowerInput)) {
      return `✅ **18. Eye Irritation / Dry Eyes**\n\n**Cause:** Screen exposure, dryness.\n\n**Medication:**\n- Artificial tears\n- Antihistamine drops for allergies\n\n**Important:**\n- Take regular breaks from screens (20-20-20 rule)\n- Use a humidifier\n- Avoid rubbing your eyes\n- Protect your eyes from wind and sun\n- Consult an eye doctor if symptoms persist` + disclaimer;
    }

    if (/(vitamin|deficiency)/.test(lowerInput)) {
      return `✅ **19. Vitamin Deficiency**\n\n**Cause:** Poor diet or absorption issues.\n\n**Medication:**\n- Vitamin D, Vitamin C, or multivitamin tablets\n\n**Important:**\n- Eat a balanced diet rich in fruits and vegetables\n- Get adequate sun exposure for vitamin D\n- Consult a healthcare provider before starting supplements\n- Some vitamin deficiencies may require specific treatments` + disclaimer;
    }

    if (/(menstrual|period|cramps)/.test(lowerInput)) {
      return `✅ **20. Menstrual Cramps**\n\n**Cause:** Hormonal changes.\n\n**Medication:**\n- NSAIDs (ibuprofen, naproxen)\n- Heat therapy\n- Hormonal pills (as prescribed)\n\n**Important:**\n- Regular exercise can help reduce cramps\n- Apply heat to the lower abdomen\n- Stay hydrated\n- Rest when needed\n- Consult a healthcare provider if pain is severe` + disclaimer;
    }

    if (/(counterfeit|fake|fake medicine)/.test(lowerInput)) {
      return "Detecting counterfeit medicines is crucial for your safety. Here are some signs to watch for:\n\n**Visual Inspection:**\n- Unusual packaging, spelling errors, poor quality printing\n- Differences in pill color, shape, or size from your usual prescription\n- Cracks or chips in tablets\n\n**Other Signs:**\n- Unusual taste, smell, or texture\n- Lack of effect when taken\n- Unexpected side effects\n\n**How Veripill Helps:**\nOur AI-powered tools analyze images of medicines and packaging to detect inconsistencies that may indicate counterfeits. We also verify QR codes and barcodes against manufacturer databases.\n\n**If you suspect a counterfeit:**\n- Stop using the medication\n- Report it to your pharmacist and healthcare provider\n- Use Veripill to verify the medicine\n- Report it to regulatory authorities";
    }

    if (/(information about|tell me about|what is)\s+([a-z]+)/.test(lowerInput)) {
      const medicineMatch = lowerInput.match(/(?:information about|tell me about|what is)\s+([a-z]+)/i);
      if (medicineMatch) {
        const medicine = medicineMatch[1];
        return `I'd be happy to provide general information about ${medicine}. However, I need to let you know that my knowledge is limited to common over-the-counter medications and general health information. For specific prescription medications, it's best to consult with a pharmacist or healthcare provider.\n\nCould you provide more details about what you'd like to know about ${medicine}? For example, are you looking for information about its uses, potential side effects, or something else?` + disclaimer;
      }
    }

    if (lowerInput.includes('side effect') || lowerInput.includes('side effects') || lowerInput.includes('adverse effect')) {
      return `Side effects are unwanted or unexpected reactions to medications. They can range from mild to severe and vary depending on the medication, dosage, and individual factors.\n\n**Common Types of Side Effects:**\n\n1. **Gastrointestinal:** Nausea, vomiting, diarrhea, constipation, stomach pain\n2. **Central Nervous System:** Drowsiness, dizziness, headache, insomnia\n3. **Allergic Reactions:** Rash, itching, hives, swelling (can be severe)\n4. **Cardiovascular:** Changes in heart rate, blood pressure\n\n**Important Points:**\n- Not everyone experiences side effects\n- They often occur when starting a new medication or changing dosage\n- Many side effects are mild and go away as your body adjusts\n- Always read the medication label and patient information leaflet\n- Report severe or persistent side effects to your healthcare provider\n\nIf you're concerned about side effects from a specific medication, please provide the name and I'll share general information about it.` + disclaimer;
    }

    return "I understand you're looking for information about medications or health. While I can provide general information about common over-the-counter medicines and health topics, I don't have specific details about what you're asking. Could you please rephrase your question or be more specific? For personalized medical advice, always consult with a healthcare professional.";
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { id: Date.now(), text: input, sender: 'user' }];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(currentInput);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 800);
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed bottom-24 right-5 w-80 h-[28rem] bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl flex flex-col z-[90] border border-gray-700">
      <div className="p-3 flex justify-between items-center bg-gray-800 rounded-t-xl">
        <h3 className="text-white font-bold">Veripill Assistant (VPA)</h3>
        <button onClick={() => setIsChatOpen(false)} className="text-gray-300 hover:text-white"><CloseIcon/></button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto whitespace-pre-wrap">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} mb-2`}>
            <div className={`px-3 py-2 rounded-lg max-w-xs text-sm ${msg.sender === 'bot' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
              {msg.text.split('**').map((part, i) => i % 2 === 1 ? <b key={i}>{part}</b> : part)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t border-gray-700 flex">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about a medicine or symptom..."
          className="flex-1 bg-gray-700 text-white rounded-l-md px-3 py-2 focus:outline-none"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">→</button>
      </div>
    </div>
  );
};

export default Chatbot;
