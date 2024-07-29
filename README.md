<p align="center">
    <img src="images/hero.png" alt="youknow_hero.png"/>
</p>

<h2>
	<p align="center">
    	<strong>
        	Personalized course generation platform
   		</strong>
	</p>
    <p align="center">
    	<a href="https://github.com/AcademAI/youknow/pulse">
        	<img src="https://img.shields.io/github/commit-activity/m/AcademAI/youknow" alt="Activity" />
    	</a>
    	<a href="https://github.com/AcademAI/youknow/commits/master">
        	<img src="https://img.shields.io/github/last-commit/AcademAI/youknow.svg" alt="Commits" />
    	</a>
    </p>

</h2>

## Purpose

The system's goal is to automate the process of online self-education, which will allow generating the structure and contents of educational courses according to the needs of the learner with the help of LLM.

The platform's main features include:

- User registrations;
- Account editing;
- Course generation;
- Course managing;
- Solving tests;
- Forming a course feed;
- Moderation functionality;
- Generating reports on learning progress;
- Chatting with the AI during the learning process.

## Video Presentation

https://github.com/AcademAI/youknow/assets/102802049/1873f2a9-4870-4dc7-ba52-f7ca71d61055

## Installation

1. `git clone https://github.com/AcademAI/youknow`
2. Fill each of 3 `.env` with values (example in .env.example)
3. `docker network create <network_name>`
4. `docker-compose up -d`

## Architecture

### DFD-0

<p align="center">
    <img src="images/dfd0.png" alt="dfd0_diagram.png"/>
</p>

### DFD-1

<p align="center">
    <img src="images/dfd1.png" alt="dfd1_diagram.png"/>
</p>

### Deployment diagram

<p align="center">
    <img src="images/deploy.png" alt="deploy_diagram.png"/>
</p>

### Database model

<p align="center">
    <img src="images/db.png" alt="db_model.png"/>
</p>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=AcademAI/youknow&type=Date)](https://star-history.com/#AcademAI/youknow&Date)

**[⬆ back to top](#installation)**

## License

Licensed under the CC License. See [LICENSE](LICENSE) for the full license text.
