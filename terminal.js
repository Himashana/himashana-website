// Terminal functionality
import { profile } from './data/profile.js';

const DIVIDER = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

class PortfolioTerminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.body = document.getElementById('terminal-body');
        this.output = this.body.querySelector('.terminal-output');
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clearTerminal(),
            about: () => this.showAbout(),
            skills: () => this.showSkills(),
            education: () => this.showEducation(),
            contact: () => this.showContact(),
            projects: () => this.showProjects(),
            whoami: () => this.showWhoami(),
            date: () => this.showDate(),
            echo: (args) => this.echo(args),
            social: () => this.showSocial(),
            resume: () => this.showResume(),
            ls: () => this.listSections(),
            cd: (args) => this.navigateSection(args),
        };
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('keydown', (e) => this.handleInput(e));
        
        // Focus input when clicking anywhere in terminal
        this.body.addEventListener('click', () => {
            this.input.focus();
        });
        
        // Keep cursor blinking
        setInterval(() => {
            const cursor = document.querySelector('.terminal-cursor');
            if (cursor && document.activeElement === this.input) {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }
        }, 500);
    }
    
    handleInput(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = this.input.value.trim();
            
            if (command) {
                this.addOutput(command, true);
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
            }
            
            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autocomplete();
        }
    }
    
    executeCommand(input) {
        const parts = input.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');
        
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, false, 'error');
        }
        
        this.scrollToBottom();
    }
    
    addOutput(text, isCommand = false, className = '') {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (isCommand) {
            line.innerHTML = `<span class="terminal-prompt">guest@himashana:~$</span> <span class="terminal-text">${text}</span>`;
        } else {
            line.innerHTML = `<span class="terminal-text ${className}">${text}</span>`;
        }
        
        this.output.appendChild(line);
    }
    
    scrollToBottom() {
        this.body.scrollTop = this.body.scrollHeight;
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
    }
    
    autocomplete() {
        const input = this.input.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(matches.join('  '), false, 'text-info');
        }
    }
    
    showHelp() {
        const helpText = `
<span class="text-primary fw-semibold">Available Commands:</span>
  <span class="text-success">help</span>       - Show this help message
  <span class="text-success">about</span>      - Learn more about me
  <span class="text-success">skills</span>     - View my technical skills
  <span class="text-success">education</span>  - View my education background
  <span class="text-success">contact</span>    - Get my contact information
  <span class="text-success">projects</span>   - View my projects (coming soon)
  <span class="text-success">social</span>     - View my social media links
  <span class="text-success">resume</span>     - Download my resume
  <span class="text-success">whoami</span>     - Display user information
  <span class="text-success">date</span>       - Display current date and time
  <span class="text-success">ls</span>         - List available sections
  <span class="text-success">cd</span> [section] - Navigate to a section
  <span class="text-success">echo</span> [text] - Print text to terminal
  <span class="text-success">clear</span>      - Clear the terminal screen
        `;
        this.addOutput(helpText);
    }
    
    showAbout() {
        const specializations = profile.bio.specializations
            .map((s) => `  • ${s}`)
            .join('\n');
        const education = profile.education
            .map((e) => `  • ${e.title} - ${e.institution}`)
            .join('\n');
        const aboutText = `
<span class="text-primary fw-semibold">About ${profile.identity.fullName}</span>
${DIVIDER}
${profile.bio.paragraphs[0]}

<span class="text-warning">Specializations:</span>
${specializations}

<span class="text-warning">Education:</span>
${education}
        `;
        this.addOutput(aboutText);
    }

    showSkills() {
        const categories = profile.skills
            .map((category) => {
                const items = category.items.map((i) => i.name).join(', ');
                return `<span class="text-warning">${category.title}:</span>\n  ${items}`;
            })
            .join('\n\n');
        const skillsText = `
<span class="text-primary fw-semibold">Technical Skills</span>
${DIVIDER}
${categories}
        `;
        this.addOutput(skillsText);
    }

    showEducation() {
        const entries = profile.education
            .map((e) => `<span class="text-success">${e.date}</span>\n  ${e.title}\n  ${e.institution}`)
            .join('\n\n');
        const educationText = `
<span class="text-primary fw-semibold">Educational Background</span>
${DIVIDER}
${entries}
        `;
        this.addOutput(educationText);
    }

    showContact() {
        const { email, phone, location } = profile.contact;
        const contactText = `
<span class="text-primary fw-semibold">Contact Information</span>
${DIVIDER}
<span class="text-warning">Email:</span>    ${email}
<span class="text-warning">Phone:</span>    ${phone}
<span class="text-warning">Location:</span> ${location}

Feel free to reach out for collaborations or opportunities!
        `;
        this.addOutput(contactText);
    }
    
    showProjects() {
        const projectsText = `
<span class="text-primary fw-semibold">Projects</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="text-info">Coming soon...</span>

Stay tuned for my latest projects and open-source contributions!
        `;
        this.addOutput(projectsText);
    }
    
    showWhoami() {
        this.addOutput(`<span class="text-success">${profile.identity.fullName}</span> - ${profile.identity.title}`);
    }
    
    showDate() {
        const now = new Date();
        this.addOutput(now.toString());
    }
    
    echo(text) {
        this.addOutput(text || '');
    }
    
    showSocial() {
        const links = profile.social
            .map((s) => {
                const display = s.url.replace(/^https?:\/\//, '');
                const label = `${s.name}:`.padEnd(11, ' ');
                return `<span class="text-info">${label}</span>${display}`;
            })
            .join('\n');
        const socialText = `
<span class="text-primary fw-semibold">Social Media Links</span>
${DIVIDER}
${links}
        `;
        this.addOutput(socialText);
    }

    showResume() {
        if (profile.resumeUrl) {
            window.open(profile.resumeUrl, '_blank', 'noopener');
            this.addOutput('<span class="text-success">✓</span> Opening resume in a new tab...');
        } else {
            this.addOutput('<span class="text-success">✓</span> Resume download initiated... (coming soon)');
        }
    }
    
    listSections() {
        const sectionsText = `
<span class="text-primary fw-semibold">Available Sections:</span>
  about-me
  skills
  education
  contact
  terminal
        `;
        this.addOutput(sectionsText);
    }
    
    navigateSection(section) {
        if (!section) {
            this.addOutput('Usage: cd [section-name]', false, 'error');
            return;
        }
        
        const sectionId = section.includes('-') ? section : `${section}-section`;
        const element = document.getElementById(sectionId);
        
        if (element) {
            this.addOutput(`<span class="text-success">✓</span> Navigating to ${section}...`);
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        } else {
            this.addOutput(`Section '${section}' not found. Type 'ls' to see available sections.`, false, 'error');
        }
    }
}

export { PortfolioTerminal };
