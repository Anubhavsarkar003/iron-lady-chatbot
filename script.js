document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const apiKeyInput = document.getElementById('api-key-input');
    const saveApiKeyButton = document.getElementById('save-api-key');
    
    let apiKey = localStorage.getItem('ironLadyApiKey') || '';
    let useAIApi = false;
    
    if (apiKey) {
        apiKeyInput.value = '••••••••••••••••';
        useAIApi = true;
        addMessage("AI features enabled. I'm now powered by advanced AI to better assist you!", false);
    }
    
    // Enhanced Iron Lady program knowledge base
    const knowledgeBase = {
        // Programs information
        programs: "Iron Lady offers three main leadership programs: 1) Women in Leadership (for emerging female leaders), 2) Executive Leadership Mastery (for senior leaders), and 3) Transformational Leadership (focused on change management). We also offer specialized workshops on communication, negotiation, and strategic thinking.",
        
        // Program details
        duration: "Program durations vary: Women in Leadership is 8 weeks, Executive Leadership Mastery runs for 12 weeks, and Transformational Leadership is a 10-week program. Workshops are typically 1-2 day intensive sessions.",
        format: "We offer flexible learning options! Our programs are available both online through live virtual sessions and in-person at our centers in major cities. Hybrid options are also available for some programs.",
        certificates: "Yes, all our programs provide recognized certificates upon successful completion. Our Executive Leadership Mastery program also includes a professional diploma that is industry-recognized.",
        mentors: "Our mentors are seasoned industry leaders with 15+ years of experience. They include Fortune 500 executives, renowned leadership coaches, authors of bestselling leadership books, and specialists in women's leadership development.",
        cost: "Program fees vary depending on the program and format. Women in Leadership starts at $1,200, Executive Leadership Mastery is $3,500, and Transformational Leadership is $2,500. We offer early-bird discounts and scholarship opportunities.",
        eligibility: "Each program has different eligibility criteria. Generally, Women in Leadership is for early to mid-career professionals, Executive Leadership Mastery requires 10+ years of experience, and Transformational Leadership is for managers and directors leading organizational change.",
        
        // Getting started information
        started: "Getting started with Iron Lady is simple! Here's how:\n\n1. Explore our programs to find the right fit for your goals\n2. Check the eligibility requirements for your chosen program\n3. Complete the online application form\n4. Attend a brief consultation call with our program advisor\n5. Submit any required documentation\n6. Receive acceptance and complete enrollment\n\nWould you like more details about any specific program?",
        
        // Application process
        process: "Our application process is designed to be straightforward:\n\n1. <span class='step-number'>1</span> <strong>Program Selection:</strong> Choose the program that aligns with your goals\n2. <span class='step-number'>2</span> <strong>Application Form:</strong> Complete our online application (takes about 20 minutes)\n3. <span class='step-number'>3</span> <strong>Documentation:</strong> Submit your resume/CV and any supporting materials\n4. <span class='step-number'>4</span> <strong>Consultation:</strong> Schedule a 30-minute video call with our advisor\n5. <span class='step-number'>5</span> <strong>Review:</strong> Our committee reviews your application (3-5 business days)\n6. <span class='step-number'>6</span> <strong>Admission Decision:</strong> You'll receive an email with the outcome\n7. <span class='step-number'>7</span> <strong>Enrollment:</strong> Complete payment and registration if accepted\n\nWe're here to help at every step!",
        
        // Contact information
        contact: "<div class='contact-info'><strong>Contact Iron Lady Leadership Programs:</strong><br><br>" +
                 "📞 <strong>Phone:</strong> +1 (555) 123-4567<br>" +
                 "✉️ <strong>Email:</strong> info@ironladyprograms.com<br>" +
                 "🌐 <strong>Website:</strong> www.ironladyprograms.com<br>" +
                 "📍 <strong>Address:</strong> 123 Leadership Avenue, Suite 400, New York, NY 10001<br><br>" +
                 
                 "<strong>Office Hours:</strong><br>" +
                 "Monday-Friday: 9:00 AM - 6:00 PM EST<br>" +
                 "Saturday: 10:00 AM - 2:00 PM EST<br>" +
                 "Sunday: Closed<br><br>" +
                 
                 "For specific program inquiries, you can also contact:<br>" +
                 "📧 <strong>Admissions:</strong> admissions@ironladyprograms.com<br>" +
                 "📧 <strong>Support:</strong> support@ironladyprograms.com</div>",
        
        // Payment options
        payment: "We offer several payment options for your convenience:\n\n" +
                 "• <strong>Full Payment:</strong> Pay the entire fee upfront and receive a 5% discount\n" +
                 "• <strong>Installment Plan:</strong> Pay 50% at registration and the remainder midway through the program\n" +
                 "• <strong>Corporate Sponsorship:</strong> Many participants have their employers cover the program costs\n" +
                 "• <strong>Scholarships:</strong> We offer limited need-based and merit-based scholarships\n\n" +
                 "All major credit cards, bank transfers, and company invoices are accepted.",
        
        // Curriculum information
        curriculum: "Our curriculum is designed to be practical and transformative:\n\n" +
                    "<strong>Core Components:</strong>\n" +
                    "• Leadership theory and practical application\n" +
                    "• Personalized coaching sessions\n" +
                    "• Peer learning groups\n" +
                    "• Real-world case studies\n" +
                    "• Networking events with industry leaders\n\n" +
                    
                    "<strong>Sample Topics Covered:</strong>\n" +
                    "• Strategic decision-making\n" +
                    "• Effective communication for leaders\n" +
                    "• Building and leading high-performance teams\n" +
                    "• Negotiation and conflict resolution\n" +
                    "• Personal leadership brand development\n" +
                    "• Change management and innovation",
        
        // Outcomes
        outcomes: "Our participants achieve remarkable outcomes:\n\n" +
                  "• <span class='highlight'>93%</span> report increased confidence in leadership capabilities\n" +
                  "• <span class='highlight'>87%</span> receive promotions or expanded responsibilities within 12 months\n" +
                  "• <span class='highlight'>95%</span> would recommend our programs to colleagues\n" +
                  "• <span class='highlight'>100%</span> complete the program with an actionable leadership development plan\n\n" +
                  "You'll also join our alumni network of 5,000+ leaders worldwide!",
        
        // Default responses
        greeting: "Hello! I'm here to help you learn about Iron Lady's leadership programs. What would you like to know?",
        default: "I'm not sure I understand. Could you please rephrase your question? You can ask about our programs, their duration, format, certificates, mentors, cost, or eligibility requirements."
    };
    
    // Function to add a message to the chat
    function addMessage(content, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const iconDiv = document.createElement('div');
        iconDiv.classList.add('message-icon');
        iconDiv.classList.add(isUser ? 'user-icon' : 'bot-icon');
        
        const icon = document.createElement('i');
        icon.classList.add('fas');
        icon.classList.add(isUser ? 'fa-user' : 'fa-robot');
        iconDiv.appendChild(icon);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        // Use innerHTML to render HTML content like lists
        if (content.includes('<li>') || content.includes('<strong>') || content.includes('<span class="step-number')) {
            messageContent.innerHTML = content;
        } else {
            const messageParagraph = document.createElement('p');
            messageParagraph.textContent = content;
            messageContent.appendChild(messageParagraph);
        }
        
        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime();
        
        messageContent.appendChild(timestamp);
        
        messageDiv.appendChild(iconDiv);
        messageDiv.appendChild(messageContent);
        
        chatContainer.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Function to get current time for timestamp
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Function to hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    // Function to call OpenAI API
    async function callOpenAIAPI(input) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant for Iron Lady Leadership Programs. Provide information about their leadership programs, duration, format, certificates, mentors, costs, and eligibility. Be professional, encouraging, and focused on women\'s leadership development. If asked about something unrelated to leadership development or Iron Lady programs, politely steer the conversation back to the programs.'
                        },
                        {
                            role: 'user',
                            content: input
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw error;
        }
    }
    
    // Function to simulate AI thinking and response
    function simulateAIResponse(input) {
        return new Promise((resolve) => {
            showTypingIndicator();
            
            // Simulate network delay and processing time
            setTimeout(() => {
                hideTypingIndicator();
                
                const lowerInput = input.toLowerCase();
                let response = knowledgeBase.default;
                
                // Determine the best response based on input
                if (lowerInput.includes('program') || lowerInput.includes('offer') || lowerInput.includes('provide')) {
                    response = knowledgeBase.programs;
                } else if (lowerInput.includes('duration') || lowerInput.includes('long') || lowerInput.includes('week') || lowerInput.includes('month')) {
                    response = knowledgeBase.duration;
                } else if (lowerInput.includes('online') || lowerInput.includes('offline') || lowerInput.includes('format') || lowerInput.includes('in-person') || lowerInput.includes('virtual')) {
                    response = knowledgeBase.format;
                } else if (lowerInput.includes('certificate') || lowerInput.includes('diploma') || lowerInput.includes('credential')) {
                    response = knowledgeBase.certificates;
                } else if (lowerInput.includes('mentor') || lowerInput.includes('coach') || lowerInput.includes('trainer') || lowerInput.includes('instructor')) {
                    response = knowledgeBase.mentors;
                } else if (lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('fee') || lowerInput.includes('pay')) {
                    response = knowledgeBase.payment;
                } else if (lowerInput.includes('eligibility') || lowerInput.includes('qualify') || lowerInput.includes('require') || lowerInput.includes('criteria')) {
                    response = knowledgeBase.eligibility;
                } else if (lowerInput.includes('start') || lowerInput.includes('begin') || lowerInput.includes('get started')) {
                    response = knowledgeBase.started;
                } else if (lowerInput.includes('process') || lowerInput.includes('application') || lowerInput.includes('apply') || lowerInput.includes('procedure')) {
                    response = knowledgeBase.process;
                } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('address')) {
                    response = knowledgeBase.contact;
                } else if (lowerInput.includes('curriculum') || lowerInput.includes('teach') || lowerInput.includes('learn') || lowerInput.includes('topic')) {
                    response = knowledgeBase.curriculum;
                } else if (lowerInput.includes('outcome') || lowerInput.includes('result') || lowerInput.includes('benefit') || lowerInput.includes('achieve')) {
                    response = knowledgeBase.outcomes;
                } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
                    response = knowledgeBase.greeting;
                }
                
                // Sometimes add a follow-up question to make it more conversational
                if (Math.random() > 0.5 && !lowerInput.includes('hello') && !lowerInput.includes('hi')) {
                    const followUps = [
                        "\n\nIs there anything else you'd like to know about our programs?",
                        "\n\nWould you like information about any other aspect of our programs?",
                        "\n\nLet me know if you need details about any other program aspects!"
                    ];
                    response += followUps[Math.floor(Math.random() * followUps.length)];
                }
                
                resolve(response);
            }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
        });
    }
    
    // Function to process user input and generate response
    async function processInput(input) {
        if (!input.trim()) return;
        
        addMessage(input, true);
        userInput.value = '';
        
        let response;
        
        if (useAIApi && apiKey) {
            try {
                showTypingIndicator();
                response = await callOpenAIAPI(input);
                hideTypingIndicator();
            } catch (error) {
                console.error('API Error:', error);
                hideTypingIndicator();
                response = "I'm having trouble connecting to the AI service. Let me answer that based on my local knowledge.\n\n";
                response += await simulateAIResponse(input);
            }
        } else {
            response = await simulateAIResponse(input);
        }
        
        addMessage(response, false);
    }
    
    // Event listener for send button
    sendButton.addEventListener('click', function() {
        const message = userInput.value.trim();
        processInput(message);
    });
    
    // Event listener for Enter key in input field
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            processInput(message);
        }
    });
    
    // Event listeners for quick reply buttons
    quickReplies.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            processInput(question);
        });
    });
    
    // Event listener for saving API key
    saveApiKeyButton.addEventListener('click', function() {
        const key = apiKeyInput.value.trim();
        
        if (key && key !== '••••••••••••••••') {
            apiKey = key;
            localStorage.setItem('ironLadyApiKey', key);
            apiKeyInput.value = '••••••••••••••••';
            useAIApi = true;
            
            addMessage("API key saved successfully! AI features are now enabled.", false);
        } else if (key === '••••••••••••••••' && apiKey) {
            // Already has a key saved
            addMessage("AI features are already enabled with your saved API key.", false);
        } else {
            addMessage("Please enter a valid API key to enable AI features.", false);
        }
    });
    
    // Focus on input field when page loads
    userInput.focus();
    
    // Add welcome message after a short delay
    setTimeout(() => {
        addMessage("Hi there! I can help you learn about Iron Lady's leadership development programs, application process, and more. What would you like to know?", false);
    }, 800);
});
