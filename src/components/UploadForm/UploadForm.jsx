import React from 'react'
import { useState } from 'react';

function UploadForm(){

    const [jobDescription , setJobDesc] =useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleChangeJob=(e)=>{
        setJobDesc(e.target.value);
    }

    const handleFileChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            setResumeFile(file);
        }
    }

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!resumeFile || !jobDescription) return;

  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('jobDescription', jobDescription);

  setLoading(true);
  try {
    const response = await fetch('https://atsscorebackend.onrender.com/score', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setScore(data.score);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
        <div className="w-[30%] h-[40%] p-4 bg-white border-amber-50 rounded-xl">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h1>
            <textarea
                id="job-description"
                name="job-description"
                rows="6"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={handleChangeJob}
                className="w-full p-4 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
            />
            <div className="text-center mb-4">
             <label
                htmlFor="resume-upload"
                className="inline-flex items-center text-blue-600 font-medium cursor-pointer hover:underline"
                >
                <span className="text-xl font-bold mr-1">+</span>
                Upload Resume
             </label>
             <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
             />
             {resumeFile && (
                <p className="mt-2 text-sm text-gray-700">
                     Selected: <span className="font-medium">{resumeFile.name}</span>
                </p>
             )}

            </div>
            <div className='flex justify-center'>
                <button
                type="submit"
                onClick={handleSubmit}
                className="w-[40%] bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                 {loading ? 'Scoring...' : 'Predict Score'}

                </button>
            </div>
            {score !== null && (
             <p className="mt-4 text-lg text-green-600 font-semibold text-center">
              ATS Match Score: {score}%
                </p>
            )}

            
        </div>
    </>
  )
}

export default UploadForm