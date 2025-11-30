// Quantum Cryptography Demo Application
class QuantumCryptoDemo {
    constructor() {
        this.data = {
            rsa_demo: {
                public_key: [2263, 7],
                private_key: [2263, 1543], 
                n: 2263,
                message: 7,
                encrypted: 2074,
                decrypted: 7,
                classical_factors: [31, 73],
                quantum_factors: [31, 73],
                classical_time: "Exponential O(e^n)",
                quantum_time: "Polynomial O(n³)"
            },
            e91_protocol: {
                normal_operation: {
                    num_pairs: 100,
                    matching_pairs: 19,
                    shared_key_length: 19,
                    qber: 0.02,
                    eavesdrop_detected: false,
                    threat_level: "LOW"
                },
                under_attack: {
                    num_pairs: 100, 
                    matching_pairs: 16,
                    shared_key_length: 16,
                    qber: 0.28,
                    eavesdrop_detected: true,
                    threat_level: "HIGH",
                    attack_patterns: ["intercept_resend_attack", "photon_number_splitting"],
                    attack_probability: 0.85
                }
            },
            ai_detection: {
                baseline_qber: 0.02,
                alert_threshold: 0.11,
                anomaly_scores: [0.1, 0.2, 0.8, 2.5],
                threat_levels: ["LOW", "LOW", "MEDIUM", "HIGH"],
                recommendations: [
                    "Continue key exchange - Normal operation",
                    "Continue key exchange - Normal operation", 
                    "Monitor closely - Elevated error rate detected",
                    "Abort key exchange - Possible eavesdropping detected"
                ]
            },
            shors_steps: [
                "Choose random a < n where gcd(a,n) = 1",
                "Create quantum superposition of all possible periods",
                "Apply modular exponentiation: |x⟩|a^x mod n⟩", 
                "Apply Quantum Fourier Transform (QFT)",
                "Measure to extract period r",
                "Use period to find factors: gcd(a^(r/2) ± 1, n)"
            ]
        };
        
        this.currentState = {
            isUnderAttack: false,
            qberChart: null,
            monitoringActive: false,
            e91Active: false,
            anomalyScore: 0.1,
            currentTab: 'rsa-vulnerability'
        };

        this.initializeApp();
    }

    initializeApp() {
        this.setupTabNavigation();
        this.setupRSADemo();
        this.setupShorsAlgorithm();
        this.setupE91Protocol();
        this.setupAIMonitoring();
        this.setupSecureCommunication();
        this.setupModal();
        this.setupGlobalControls();
        this.loadAssets();
    }

    async loadAssets() {
        try {
            // Load external data assets if available
            const rsaResponse = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/70abc0cc8077a7c751019f34d805bbac/67bd040c-1a3b-4ef5-b8f2-83c08ff3290d/d2a3d74f.json');
            const e91Response = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/70abc0cc8077a7c751019f34d805bbac/f176a7a2-5c23-4e4b-a567-fe1b9c1d5534/8ca7ee8f.json');
            
            if (rsaResponse.ok) {
                const rsaData = await rsaResponse.json();
                Object.assign(this.data.rsa_demo, rsaData);
            }
            
            if (e91Response.ok) {
                const e91Data = await e91Response.json();
                Object.assign(this.data.e91_protocol, e91Data);
            }
        } catch (error) {
            console.log('Using default data - external assets not available');
        }
        
        this.updateRSADisplay();
        this.updateE91Display();
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active tab content
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(targetTab).classList.add('active');
                
                this.currentState.currentTab = targetTab;
                
                // Initialize tab-specific features
                if (targetTab === 'ai-security' && !this.currentState.qberChart) {
                    this.initializeQBERChart();
                }
            });
        });
    }

    setupRSADemo() {
        const generateKeysBtn = document.getElementById('generate-rsa-keys');
        const encryptBtn = document.getElementById('encrypt-message');
        const classicalAttackBtn = document.getElementById('classical-attack');
        const quantumAttackBtn = document.getElementById('quantum-attack');

        generateKeysBtn?.addEventListener('click', () => this.generateRSAKeys());
        encryptBtn?.addEventListener('click', () => this.encryptMessage());
        classicalAttackBtn?.addEventListener('click', () => this.simulateClassicalAttack());
        quantumAttackBtn?.addEventListener('click', () => this.simulateQuantumAttack());

        this.updateRSADisplay();
    }

    generateRSAKeys() {
        // Simulate new RSA key generation
        const primes = [[31, 73], [37, 67], [41, 61], [43, 59]];
        const randomPrime = primes[Math.floor(Math.random() * primes.length)];
        
        this.data.rsa_demo.classical_factors = randomPrime;
        this.data.rsa_demo.quantum_factors = randomPrime;
        this.data.rsa_demo.n = randomPrime[0] * randomPrime[1];
        this.data.rsa_demo.public_key = [this.data.rsa_demo.n, 7];
        
        this.updateRSADisplay();
        this.showAlert('New RSA keys generated successfully!', 'success');
    }

    encryptMessage() {
        // Simulate message encryption
        const messages = [7, 42, 123, 256];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        this.data.rsa_demo.message = randomMessage;
        this.data.rsa_demo.encrypted = Math.pow(randomMessage, 7) % this.data.rsa_demo.n;
        this.data.rsa_demo.decrypted = randomMessage;
        
        this.updateRSADisplay();
        this.showAlert('Message encrypted successfully!', 'success');
    }

    simulateClassicalAttack() {
        const statusElement = document.getElementById('classical-status');
        statusElement.textContent = 'Attempting to factor...';
        statusElement.classList.add('status-attacking');

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 5;
            statusElement.textContent = `Progress: ${Math.min(progress, 99).toFixed(1)}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                statusElement.textContent = 'Failed - Would take years!';
                statusElement.classList.remove('status-attacking');
                this.showAlert('Classical attack failed - exponential time complexity!', 'warning');
            }
        }, 200);

        // Stop after 5 seconds to demonstrate the difficulty
        setTimeout(() => {
            clearInterval(interval);
            statusElement.textContent = 'Timeout - Computationally infeasible';
            statusElement.classList.remove('status-attacking');
        }, 5000);
    }

    simulateQuantumAttack() {
        const statusElement = document.getElementById('quantum-status');
        statusElement.textContent = 'Running Shor\'s Algorithm...';
        statusElement.classList.add('status-attacking');

        let step = 0;
        const steps = ['Preparing qubits...', 'Quantum superposition...', 'Period finding...', 'QFT applied...', 'Factors found!'];
        
        const interval = setInterval(() => {
            statusElement.textContent = steps[step];
            step++;
            
            if (step >= steps.length) {
                clearInterval(interval);
                statusElement.textContent = `Factors: ${this.data.rsa_demo.quantum_factors.join(' × ')} - RSA Broken!`;
                statusElement.classList.remove('status-attacking');
                this.showAlert('Quantum attack successful - RSA encryption compromised!', 'error');
            }
        }, 800);
    }

    updateRSADisplay() {
        const elements = {
            'rsa-public-key': `(${this.data.rsa_demo.public_key.join(', ')})`,
            'rsa-private-key': `(${this.data.rsa_demo.private_key.join(', ')})`,
            'rsa-factors': `${this.data.rsa_demo.classical_factors.join(' × ')}`,
            'original-message': this.data.rsa_demo.message,
            'encrypted-message': this.data.rsa_demo.encrypted,
            'decrypted-message': this.data.rsa_demo.decrypted
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    setupShorsAlgorithm() {
        const runShorsBtn = document.getElementById('run-shors');
        runShorsBtn?.addEventListener('click', () => this.runShorsAlgorithm());

        this.displayShorsSteps();
    }

    displayShorsSteps() {
        const stepsContainer = document.getElementById('shors-steps');
        if (!stepsContainer) return;

        stepsContainer.innerHTML = '';
        this.data.shors_steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'algorithm-step';
            stepElement.innerHTML = `
                <span class="step-number">${index + 1}</span>
                <span class="step-description">${step}</span>
                <span class="step-status pending" id="step-${index}">Pending</span>
            `;
            stepsContainer.appendChild(stepElement);
        });
    }

    runShorsAlgorithm() {
        const steps = document.querySelectorAll('#shors-steps .step-status');
        const gates = document.querySelectorAll('.gate');
        
        // Reset all steps
        steps.forEach(step => {
            step.textContent = 'Pending';
            step.className = 'step-status pending';
        });

        // Animate quantum gates
        gates.forEach((gate, index) => {
            setTimeout(() => {
                gate.classList.add('quantum-glow');
            }, index * 500);
        });

        // Execute algorithm steps
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.textContent = 'Active';
                step.className = 'step-status active';
                
                setTimeout(() => {
                    step.textContent = 'Complete';
                    step.className = 'step-status complete';
                }, 1000);
            }, index * 1200);
        });

        // Show results after completion
        setTimeout(() => {
            document.getElementById('factor-n').textContent = this.data.rsa_demo.n;
            document.getElementById('period-r').textContent = '146'; // Simulated period
            document.getElementById('found-factors').textContent = `${this.data.rsa_demo.quantum_factors.join(' × ')}`;
            
            const rsaCompromised = document.getElementById('rsa-compromised');
            rsaCompromised.textContent = 'YES';
            rsaCompromised.className = 'status status--error';
            
            // Remove glow effects
            gates.forEach(gate => gate.classList.remove('quantum-glow'));
            
            this.showAlert('Shor\'s algorithm successfully factored the RSA modulus!', 'error');
        }, steps.length * 1200 + 500);
    }

    setupE91Protocol() {
        const generateBtn = document.getElementById('generate-entanglement');
        const startQKDBtn = document.getElementById('start-qkd');
        const simulateAttackBtn = document.getElementById('simulate-attack');

        generateBtn?.addEventListener('click', () => this.generateEntanglement());
        startQKDBtn?.addEventListener('click', () => this.startE91Protocol());
        simulateAttackBtn?.addEventListener('click', () => this.simulateEavesdropping());

        this.updateE91Display();
    }

    generateEntanglement() {
        const alicePhoton = document.getElementById('alice-photon');
        const bobPhoton = document.getElementById('bob-photon');
        const aliceBasis = document.getElementById('alice-basis');
        const bobBasis = document.getElementById('bob-basis');

        // Animate entangled photons
        [alicePhoton, bobPhoton].forEach(photon => {
            photon.classList.add('animate-pulse');
        });

        // Randomize measurement bases
        const bases = ['↕', '↗', '→', '↘'];
        aliceBasis.textContent = bases[Math.floor(Math.random() * bases.length)];
        bobBasis.textContent = bases[Math.floor(Math.random() * bases.length)];

        setTimeout(() => {
            [alicePhoton, bobPhoton].forEach(photon => {
                photon.classList.remove('animate-pulse');
            });
        }, 3000);

        this.showAlert('Entangled photon pairs generated successfully!', 'success');
    }

    startE91Protocol() {
        const keyProgress = document.getElementById('key-progress');
        const quantumKey = document.getElementById('quantum-key');
        
        this.currentState.e91Active = true;
        let progress = 0;
        let generatedKey = '';
        
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            keyProgress.style.width = `${Math.min(progress, 100)}%`;
            
            // Generate random key bits
            if (Math.random() > 0.5) {
                generatedKey += Math.floor(Math.random() * 2);
            }
            quantumKey.textContent = generatedKey || 'Generating...';
            
            if (progress >= 100) {
                clearInterval(interval);
                const finalKey = this.generateQuantumKey(this.data.e91_protocol.normal_operation.shared_key_length);
                quantumKey.textContent = finalKey;
                this.showAlert('E91 quantum key distribution completed successfully!', 'success');
            }
        }, 300);
    }

    simulateEavesdropping() {
        this.currentState.isUnderAttack = true;
        
        // Update QBER and threat level
        document.getElementById('qber-value').textContent = this.data.e91_protocol.under_attack.qber.toFixed(2);
        document.getElementById('qber-value').className = 'qber-critical';
        
        const threatLevel = document.getElementById('threat-level');
        threatLevel.textContent = 'HIGH';
        threatLevel.className = 'status status--error';
        
        document.getElementById('matching-pairs').textContent = this.data.e91_protocol.under_attack.matching_pairs;
        
        this.showAlert('SECURITY BREACH DETECTED! Eavesdropping attempt identified through QBER analysis.', 'error');
        
        // Trigger AI anomaly detection
        this.currentState.anomalyScore = 2.5;
        this.updateAIDisplay();
    }

    updateE91Display() {
        const operation = this.currentState.isUnderAttack ? 
            this.data.e91_protocol.under_attack : 
            this.data.e91_protocol.normal_operation;

        const elements = {
            'entangled-pairs': operation.num_pairs,
            'matching-pairs': operation.matching_pairs,
            'qber-value': operation.qber.toFixed(2),
            'threat-level': operation.threat_level
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
                if (id === 'qber-value') {
                    element.className = operation.qber > 0.11 ? 'qber-critical' : 'qber-normal';
                }
                if (id === 'threat-level') {
                    element.className = `status status--${operation.threat_level === 'LOW' ? 'success' : 'error'}`;
                }
            }
        });
    }

    setupAIMonitoring() {
        const startBtn = document.getElementById('start-monitoring');
        const triggerBtn = document.getElementById('trigger-anomaly');
        const resetBtn = document.getElementById('reset-monitoring');

        startBtn?.addEventListener('click', () => this.startAIMonitoring());
        triggerBtn?.addEventListener('click', () => this.triggerAnomaly());
        resetBtn?.addEventListener('click', () => this.resetMonitoring());
    }

    initializeQBERChart() {
        const ctx = document.getElementById('qber-chart');
        if (!ctx) return;

        this.currentState.qberChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 20}, (_, i) => i + 1),
                datasets: [{
                    label: 'QBER',
                    data: Array.from({length: 20}, () => 0.02 + Math.random() * 0.01),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Threshold',
                    data: Array(20).fill(0.11),
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 0.5,
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        },
                        grid: {
                            color: 'rgba(var(--color-border-rgb, 94, 82, 64), 0.2)'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        },
                        grid: {
                            color: 'rgba(var(--color-border-rgb, 94, 82, 64), 0.2)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'var(--color-text)'
                        }
                    }
                }
            }
        });
    }

    startAIMonitoring() {
        this.currentState.monitoringActive = true;
        
        if (this.currentState.qberChart) {
            this.monitoringInterval = setInterval(() => {
                this.updateQBERChart();
            }, 2000);
        }
        
        this.addSecurityAlert('AI monitoring system activated', 'success');
        this.showAlert('AI anomaly detection system is now active!', 'success');
    }

    updateQBERChart() {
        if (!this.currentState.qberChart || !this.currentState.monitoringActive) return;

        const chart = this.currentState.qberChart;
        const dataset = chart.data.datasets[0];
        
        // Add new data point
        let newValue;
        if (this.currentState.isUnderAttack) {
            newValue = 0.15 + Math.random() * 0.15; // Higher QBER under attack
        } else {
            newValue = 0.02 + Math.random() * 0.02; // Normal QBER
        }
        
        dataset.data.push(newValue);
        chart.data.labels.push(chart.data.labels.length + 1);
        
        // Keep only last 20 points
        if (dataset.data.length > 20) {
            dataset.data.shift();
            chart.data.labels.shift();
        }
        
        chart.update('none');
        
        // Update anomaly score based on QBER
        if (newValue > 0.11) {
            this.currentState.anomalyScore = Math.min(3.0, this.currentState.anomalyScore + 0.3);
            this.addSecurityAlert(`Elevated QBER detected: ${newValue.toFixed(3)}`, 'warning');
        } else {
            this.currentState.anomalyScore = Math.max(0.1, this.currentState.anomalyScore - 0.1);
        }
        
        this.updateAIDisplay();
    }

    triggerAnomaly() {
        this.currentState.anomalyScore = 2.5;
        this.currentState.isUnderAttack = true;
        
        this.updateAIDisplay();
        this.addSecurityAlert('CRITICAL: Anomaly detected - possible eavesdropping attempt!', 'error');
        this.showAlert('Anomaly triggered! Check AI recommendations.', 'error');
    }

    resetMonitoring() {
        this.currentState.monitoringActive = false;
        this.currentState.isUnderAttack = false;
        this.currentState.anomalyScore = 0.1;
        
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
        
        if (this.currentState.qberChart) {
            this.currentState.qberChart.destroy();
            this.currentState.qberChart = null;
            this.initializeQBERChart();
        }
        
        document.getElementById('security-alerts').innerHTML = '';
        this.updateAIDisplay();
        this.updateE91Display();
        this.showAlert('Monitoring system reset successfully!', 'success');
    }

    updateAIDisplay() {
        const anomalyScore = document.getElementById('anomaly-score');
        const threatFill = document.getElementById('threat-fill');
        const aiRecommendation = document.getElementById('ai-recommendation');

        anomalyScore.textContent = this.currentState.anomalyScore.toFixed(1);
        
        // Update threat level bar
        const threatPercentage = Math.min(100, (this.currentState.anomalyScore / 3.0) * 100);
        threatFill.style.left = `${threatPercentage}%`;
        
        // Get appropriate recommendation
        let recommendationIndex = 0;
        if (this.currentState.anomalyScore > 2.0) recommendationIndex = 3;
        else if (this.currentState.anomalyScore > 1.0) recommendationIndex = 2;
        else if (this.currentState.anomalyScore > 0.5) recommendationIndex = 1;
        
        aiRecommendation.textContent = this.data.ai_detection.recommendations[recommendationIndex];
    }

    addSecurityAlert(message, type) {
        const alertsContainer = document.getElementById('security-alerts');
        if (!alertsContainer) return;

        const timestamp = new Date().toLocaleTimeString();
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type}`;
        alertElement.innerHTML = `
            <span class="alert-time">${timestamp}</span>
            <span class="alert-message">${message}</span>
        `;
        
        alertsContainer.insertBefore(alertElement, alertsContainer.firstChild);
        
        // Keep only last 5 alerts
        while (alertsContainer.children.length > 5) {
            alertsContainer.removeChild(alertsContainer.lastChild);
        }
    }

    setupSecureCommunication() {
        const encryptSendBtn = document.getElementById('encrypt-send');
        encryptSendBtn?.addEventListener('click', () => this.encryptAndSend());
    }

    encryptAndSend() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        
        if (!message) {
            this.showAlert('Please enter a message to encrypt!', 'warning');
            return;
        }
        
        // Simulate encryption process
        const steps = [
            { id: 'step1-status', text: 'Generating AES key using quantum bits...', delay: 1000 },
            { id: 'step2-status', text: 'Encrypting with AES-256-GCM...', delay: 1500 },
            { id: 'step3-status', text: 'Verifying quantum key integrity...', delay: 1200 },
            { id: 'step4-status', text: 'Transmitting encrypted data...', delay: 800 }
        ];
        
        steps.forEach((step, index) => {
            setTimeout(() => {
                const element = document.getElementById(step.id);
                if (element) {
                    element.textContent = '✓';
                    element.style.color = 'var(--color-success)';
                }
            }, step.delay * (index + 1));
        });
        
        // Update encrypted output after all steps
        setTimeout(() => {
            const ciphertext = this.generateRandomHex(32);
            const nonce = this.generateRandomHex(12);
            const tag = this.generateRandomHex(16);
            
            document.getElementById('ciphertext').textContent = ciphertext;
            document.getElementById('nonce').textContent = nonce;
            document.getElementById('auth-tag').textContent = tag;
            
            this.showAlert('Message encrypted and transmitted securely!', 'success');
            
            // Reset step indicators after a delay
            setTimeout(() => {
                steps.forEach(step => {
                    const element = document.getElementById(step.id);
                    if (element) {
                        element.textContent = '⏳';
                        element.style.color = '';
                    }
                });
            }, 3000);
        }, steps.reduce((sum, step, index) => sum + step.delay * (index + 1), 0) + 500);
    }

    setupModal() {
        const modal = document.getElementById('attack-modal');
        const closeBtn = document.getElementById('close-modal');
        const startSimBtn = document.getElementById('start-simulation');
        const deployDefenseBtn = document.getElementById('deploy-defense');

        closeBtn?.addEventListener('click', () => this.closeModal());
        startSimBtn?.addEventListener('click', () => this.startFullSimulation());
        deployDefenseBtn?.addEventListener('click', () => this.deployQuantumDefense());
        
        // Close modal when clicking outside
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
    }

    openModal() {
        const modal = document.getElementById('attack-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeModal() {
        const modal = document.getElementById('attack-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    startFullSimulation() {
        const statusDiv = document.getElementById('scenario-status');
        const progressBar = document.getElementById('simulation-progress');
        
        const scenarios = [
            { message: 'Establishing classical RSA communication...', progress: 20 },
            { message: 'Quantum attack detected on RSA keys!', progress: 40 },
            { message: 'Classical encryption compromised!', progress: 60 },
            { message: 'Data breach in progress...', progress: 80 },
            { message: 'CRITICAL: Financial data exposed!', progress: 100 }
        ];
        
        scenarios.forEach((scenario, index) => {
            setTimeout(() => {
                statusDiv.querySelector('.status-message').textContent = scenario.message;
                progressBar.style.width = `${scenario.progress}%`;
                
                if (index === scenarios.length - 1) {
                    statusDiv.style.background = 'var(--color-bg-4)';
                    statusDiv.style.border = '2px solid var(--color-error)';
                }
            }, index * 2000);
        });
    }

    deployQuantumDefense() {
        const statusDiv = document.getElementById('scenario-status');
        const progressBar = document.getElementById('simulation-progress');
        
        statusDiv.style.background = 'var(--color-bg-3)';
        statusDiv.style.border = '2px solid var(--color-success)';
        
        const defenseScenarios = [
            { message: 'Deploying E91 quantum key distribution...', progress: 25 },
            { message: 'AI anomaly detection system activated...', progress: 50 },
            { message: 'Quantum-safe communication established!', progress: 75 },
            { message: 'All threats neutralized - System secure!', progress: 100 }
        ];
        
        defenseScenarios.forEach((scenario, index) => {
            setTimeout(() => {
                statusDiv.querySelector('.status-message').textContent = scenario.message;
                progressBar.style.width = `${scenario.progress}%`;
            }, index * 1500);
        });
        
        setTimeout(() => {
            this.showAlert('Quantum defense successfully deployed!', 'success');
        }, 6000);
    }

    setupGlobalControls() {
        const fullDemoBtn = document.getElementById('full-demo');
        const resetDemoBtn = document.getElementById('reset-demo');

        fullDemoBtn?.addEventListener('click', () => this.startCompleteDemo());
        resetDemoBtn?.addEventListener('click', () => this.resetCompleteDemo());
    }

    startCompleteDemo() {
        this.openModal();
        setTimeout(() => this.startFullSimulation(), 500);
    }

    resetCompleteDemo() {
        // Reset all states
        this.currentState.isUnderAttack = false;
        this.currentState.anomalyScore = 0.1;
        this.currentState.e91Active = false;
        
        // Reset displays
        this.updateRSADisplay();
        this.updateE91Display();
        this.updateAIDisplay();
        
        // Reset UI elements
        document.getElementById('classical-status').textContent = 'Ready';
        document.getElementById('quantum-status').textContent = 'Ready';
        document.getElementById('quantum-key').textContent = '-';
        document.getElementById('key-progress').style.width = '0%';
        
        // Clear alerts
        const alertsContainer = document.getElementById('security-alerts');
        if (alertsContainer) alertsContainer.innerHTML = '';
        
        // Reset chart
        if (this.currentState.qberChart) {
            this.resetMonitoring();
        }
        
        this.closeModal();
        this.showAlert('Complete demonstration reset successfully!', 'success');
    }

    // Utility functions
    generateQuantumKey(length) {
        return Array.from({length}, () => Math.floor(Math.random() * 2)).join('');
    }

    generateRandomHex(length) {
        return Array.from({length}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    showAlert(message, type) {
        // Create a temporary alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '9999';
        alert.style.minWidth = '300px';
        alert.style.animation = 'slideIn 0.3s ease-out';
        alert.innerHTML = `<span class="alert-message">${message}</span>`;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }, 4000);
    }
}

// CSS for alert animations
const alertStyles = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = alertStyles;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuantumCryptoDemo();
});