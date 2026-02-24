import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("API Key exists:", !!GEMINI_API_KEY);
console.log("API Key length:", GEMINI_API_KEY?.length);

async function testModels() {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  // Updated model names from Solution 1
  const modelsToTry = [
  "models/gemini-1.5-flash-8b-exp",  // Free experimental model
  "models/gemini-1.5-flash-8b",       // Free stable model
  "models/gemini-1.5-flash",           // Free but may need verification
];
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`\n🔍 Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say hello in one word");
      const text = result.response.text();
      console.log(`✅ SUCCESS with ${modelName}:`, text);
      break; // Stop after first successful model
    } catch (err) {
      console.log(`❌ Failed with ${modelName}:`, err.message?.substring(0, 100));
    }
  }
}

testModels().catch(console.error);