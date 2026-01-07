export const demoData = {
    phase: 'setup', // setup, exam, report
    config: {
    "grade": "Grade 10",
    "subject": "Mathematics",
    "board": "CBSE",
    "duration": 20,
    "mcqCount": 10,
    "subjectiveCount": 1
    },
    questions: {
    "mcq": [
        {
            "id": "mcq_1",
            "question": "The decimal expansion of the rational number 14587/1250 will terminate after how many decimal places?",
            "options": [
                "1",
                "2",
                "3",
                "4"
            ],
            "correctAnswer": 4,
            "topic": "Real Numbers"
        },
        {
            "id": "mcq_2",
            "question": "If α and β are the zeroes of the polynomial x² + 7x + 10, then the value of α + β is:",
            "options": [
                "7",
                "-7",
                "10",
                "-10"
            ],
            "correctAnswer": 1,
            "topic": "Polynomials"
        },
        {
            "id": "mcq_3",
            "question": "The pair of equations x + 2y - 5 = 0 and 3x + 6y - 15 = 0 have:",
            "options": [
                "A unique solution",
                "Exactly two solutions",
                "Infinitely many solutions",
                "No solution"
            ],
            "correctAnswer": 2,
            "topic": "Pair of Linear Equations in Two Variables"
        },
        {
            "id": "mcq_4",
            "question": "The roots of the quadratic equation x² - 3x - 10 = 0 are:",
            "options": [
                "2, 5",
                "-2, 5",
                "2, -5",
                "-2, -5"
            ],
            "correctAnswer": 1,
            "topic": "Quadratic Equations"
        },
        {
            "id": "mcq_5",
            "question": "The 11th term of the arithmetic progression -3, -1/2, 2, ... is:",
            "options": [
                "22",
                "20",
                "23",
                "24"
            ],
            "correctAnswer": 0,
            "topic": "Arithmetic Progressions"
        },
        {
            "id": "mcq_6",
            "question": "In ΔABC, if DE || BC, AD = 1.5 cm, DB = 3 cm, AE = 1 cm, then EC is equal to:",
            "options": [
                "2 cm",
                "4 cm",
                "3 cm",
                "1 cm"
            ],
            "correctAnswer": 0,
            "topic": "Triangles"
        },
        {
            "id": "mcq_7",
            "question": "If tan A = 4/3, then the value of cos A is:",
            "options": [
                "3/5",
                "3/4",
                "4/5",
                "5/3"
            ],
            "correctAnswer": 0,
            "topic": "Trigonometry"
        },
        {
            "id": "mcq_8",
            "question": "The distance between the points (0, 0) and (3, 4) is:",
            "options": [
                "5",
                "7",
                "1",
                "25"
            ],
            "correctAnswer": 0,
            "topic": "Coordinate Geometry"
        },
        {
            "id": "mcq_9",
            "question": "If the radius of a circle is 7 cm, then its area is:",
            "options": [
                "44 cm²",
                "154 cm²",
                "88 cm²",
                "22 cm²"
            ],
            "correctAnswer": 1,
            "topic": "Areas Related to Circles"
        },
        {
            "id": "mcq_10",
            "question": "A die is thrown once. The probability of getting an even number is:",
            "options": [
                "1/6",
                "1/3",
                "1/2",
                "2/3"
            ],
            "correctAnswer": 2,
            "topic": "Probability"
        }
    ],
    "subjective": [
        {
            "id": "subj_1",
            "question": "Prove that the ratio of the areas of two similar triangles is equal to the square of the ratio of their corresponding sides.",
            "topic": "Triangles",
            "expectedPoints": [
                "State the given information and what is to be proved.",
                "Draw a clear diagram of two similar triangles.",
                "Write the formula for the area of a triangle (1/2 * base * height).",
                "Show the ratio of the areas of the two triangles.",
                "Use the similarity of the triangles to relate their corresponding sides and heights.",
                "Substitute the ratio of sides for the ratio of heights.",
                "Conclude that the ratio of areas is equal to the square of the ratio of sides."
            ]
        }
    ]
},
    answers: {
    "mcq_1": 2,
    "mcq_2": 1,
    "mcq_3": 2,
    "mcq_4": 1,
    "mcq_5": 2,
    "mcq_6": 0,
    "mcq_7": 0,
    "mcq_8": 0,
    "mcq_9": 0,
    "mcq_10": 2,
    "subj_1": " triangle ABC is similar to triangle PQR \ntherefore by cpst- \nAB/PQ=BC/QR=AC/PR \nangle A = angle P, angle B = angle Q , angle C = angle R\nto prove - ratio of area of similar triangles is equal to square of ratio of their corresponding sides\nangle A = angle P, angle B = angle Q , angle C = angle R \n"
},
  evaluationData:{
    "totalScore": 3,
    "maxScore": 11,
    "percentage": 27.27,
    "mcqScore": 2,
    "subjectiveScore": 1,
    "grade": "Needs Improvement",
    "strengths": [
        "Understands the concept of infinitely many solutions for linear equations (MCQ_3).",
        "Identifies the area of a circle given the radius (MCQ_9)."
    ],
    "weaknesses": [
        "Struggles with terminating decimal expansions (MCQ_1).",
        "Has difficulty finding the sum of zeroes of a polynomial (MCQ_2).",
        "Needs improvement in solving quadratic equations (MCQ_4).",
        "Requires practice in arithmetic progressions (MCQ_5).",
        "Needs to understand similarity of triangles better to calculate side lengths (MCQ_6).",
        "Has difficulty relating trigonometric ratios (MCQ_7).",
        "Needs practice with the distance formula (MCQ_8).",
        "Has difficulty calculating basic probabilities (MCQ_10).",
        "Unable to provide a full proof even when prompted for the subjective question (Subj_1)."
    ],
    "topicAnalysis": {
        "Real Numbers": {
            "score": 0,
            "possible": 1,
            "feedback": "Review the rules for determining when a rational number has a terminating decimal expansion."
        },
        "Polynomials": {
            "score": 1,
            "possible": 1,
            "feedback": "Practice finding the sum and product of roots of quadratic polynomials."
        },
        "Pair of Linear Equations in Two Variables": {
            "score": 1,
            "possible": 1,
            "feedback": "Good understanding of the conditions for infinitely many solutions."
        },
        "Quadratic Equations": {
            "score": 0,
            "possible": 1,
            "feedback": "Practice solving quadratic equations by factoring or using the quadratic formula."
        },
        "Arithmetic Progressions": {
            "score": 0,
            "possible": 1,
            "feedback": "Review the formula for the nth term of an arithmetic progression and practice applying it."
        },
        "Triangles": {
            "score": 0,
            "possible": 2,
            "feedback": "Review the properties of similar triangles and the Basic Proportionality Theorem. Also, practice writing geometric proofs."
        },
        "Trigonometry": {
            "score": 0,
            "possible": 1,
            "feedback": "Practice relating different trigonometric ratios using trigonometric identities."
        },
        "Coordinate Geometry": {
            "score": 0,
            "possible": 1,
            "feedback": "Review the distance formula and practice applying it to find the distance between two points."
        },
        "Areas Related to Circles": {
            "score": 1,
            "possible": 1,
            "feedback": "Understands the formula for the area of a circle."
        },
        "Probability": {
            "score": 0,
            "possible": 1,
            "feedback": "Review basic probability concepts and practice calculating probabilities of simple events."
        }
    },
    "detailedFeedback": "The student demonstrates a very basic understanding of some concepts but needs significant improvement across most topics. Focus on reviewing fundamental formulas and practicing problem-solving techniques. Special attention should be given to quadratic equations, arithmetic progressions, triangles, trigonometry, coordinate geometry, and probability. For the subjective question, the student needs to learn how to construct a full proof with all necessary steps and justifications. The student should be encouraged to practice more problems and seek clarification on concepts they find difficult."
  }
};