var typed = new Typed(".typing",{
    strings : ["Web Designer","Web Developer", "Java Developer"],
    typeSpeed : 100,
    BackSpeed : 60,
    loop : true
})
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection =allSection.length;
    for(let i=0; i<totalNavList; i++){
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function()
        {
            removeBackSection();
            for(let j=0; j<totalNavList; j++)
            {
                if(navList[j].querySelector("a").classList.contains("active"))
                {
                    addBackSection(j);
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active")
            showSection(this);
            if(window.innerWidth < 1200){
                asideSectionTogglerBtn();
            }
        })
    }
    function removeBackSection(){
        for(let i =0 ; i<totalSection; i++)
            {
                allSection[i].classList.remove("back-section");
            }
    }
    function addBackSection(num){
        allSection[num].classList.add("back-section");
    }
    function showSection(element){
        for(let i =0 ; i<totalSection; i++){
            allSection[i].classList.remove("active");
        }
        const target =element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active")
    }
    function updateNav(element){
        for(let i = 0; i<totalNavList; i++){
            navList[i].querySelector("a").classList.remove("active");
            const target =element.getAttribute("href").split("#")[1];
            if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }
    document.querySelector(".hire-me").addEventListener("click", function(){
        const sectionIndex = this.getAttribute("data-section-index");
        // console.log(sectionIndex)
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
    })
    const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside =  document.querySelector(".aside");
    navTogglerBtn.addEventListener("click", () =>{
        asideSectionTogglerBtn();
    })
    function asideSectionTogglerBtn(){
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        for(let i = 0; i<totalSection; i++){
            allSection[i].classList.toggle("open");
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        const contactForm = document.getElementById('contact_form');
        const contactMessage = document.getElementById('contact-message');
    
        const sendEmail = (e) => {
            e.preventDefault();
            console.log("Form submitted!");
            const formData = new FormData(contactForm);
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const emailRegex = /^[a-zA-Z0-9]{5,}@[^\s@]+\.[^\s@]+$/;
            const userEmail = formData.get('user_email');
            if (!formData.get('user_name') || !formData.get('user_email') || !formData.get('user_subject') || !formData.get('user_message')) {
                contactMessage.textContent = 'Please fill in all fields.';
                return;
            }
            if (!emailRegex.test(userEmail)) {
                contactMessage.textContent = 'Please enter a valid email address';
                return;
            }        
    
            emailjs.sendForm('service_wc6o8yl', 'template_t17ndir', '#contact_form', 'CfmiWJ3UClQ73zwua')
                .then(() => {
                    console.log('EmailJS: Message Sent Successfully');
                    contactMessage.textContent = 'Message Sent Successfully';
                    contactForm.reset();
                    setTimeout(() => {
                        contactMessage.textContent = '';
                    }, 3000);
                })
                .catch(error => {
                    console.error('EmailJS: Error sending email:', error);
                    contactMessage.textContent = 'Error Sending Message';
                });
        };
    
        contactForm.addEventListener("submit", sendEmail);
    });
    
    