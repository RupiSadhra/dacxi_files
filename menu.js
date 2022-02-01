const hamburger = document.querySelector('.hamburger');
const header_container = document.querySelector('.header-container');
const mobile_menu_container = document.querySelector('.mobile-menu-container');
const secondary_menu_container = document.querySelector('.secondary-menu-container');
const secondary_menu_links = document.querySelector('.secondary-menu-links div');
const mobile_menu = document.querySelector('.mobile-menu');
const close_button = document.querySelector('.close-button');
const primary_menu_has_submenu = document.querySelectorAll('.menu-item-has-children');
const letter_two = document.querySelector('.letter-two');
let menu_info_primary = [];



//calculate height of header
let header_height = document.querySelector('.header-container').offsetHeight;
//console.log(header_height);
mobile_menu_container.style.cssText = `top:${header_height}px`;




//creates array of seconadry menu links
primary_menu_has_submenu.forEach((primary_menu_li) => {
    let primary_menu_id = primary_menu_li.id;
    primary_menu_id;
    let primary_menu_a = document.querySelector(`#${primary_menu_id} a`);
    //create right arrow
    let right_arrow = document.createElement('span');
    right_arrow.style.cssText = `position:absolute; right:10%;display:inline-block;width:10px; height:10px;border-right:2px solid white; border-top:2px solid white; transform: rotate(45deg);`;
    primary_menu_a.append(right_arrow);

    //console.dir(primary_menu_li);

    let submenu_li = document.querySelectorAll(`#${primary_menu_id} ul.sub-menu li`);
    let menu_info_secondary = [];
    submenu_li.forEach((submenu_li) => {
        let secondary_menu = {};
        let submenu_id = submenu_li.id;
        //console.log(submenu_id);
        let submenu_a = document.querySelector(`#${submenu_id} a`);
        let submenu_text = submenu_a.innerText;
        let submenu_href = submenu_a.href;
        secondary_menu.text = submenu_text;
        secondary_menu.href = submenu_href;
        //console.log(secondary_menu);
        menu_info_secondary.push(secondary_menu);
    });
    //console.log(menu_info_secondary);
    menu_info_primary.push(menu_info_secondary);
});
//console.log(menu_info_primary);





//hide secondary menu on mobile
const mobileMediaQuery = window.matchMedia('(max-width: 991px)')

function handleMobileChange(e) {
    // Check if the media query is true
    if (e.matches) {
        secondary_menu_container.classList.add('hide-element');
        secondary_menu_container.classList.add('zero-width');
        secondary_menu_container.classList.remove('secondary-mobile-menu');
        letter_two.classList.add('hide-element');
        alert('secondary menu removed');
    } else {
        secondary_menu_container.classList.remove('full-width');
        letter_two.classList.remove('hide-element');
    }
}
mobileMediaQuery.addListener(handleMobileChange);
handleMobileChange(mobileMediaQuery);






//show secondary menu
primary_menu_has_submenu.forEach((primary_menu_li, index) => {
    let primary_menu_id = primary_menu_li.id;
    let primary_menu_a = document.querySelector(`#${primary_menu_id} a`);
    primary_menu_a.addEventListener('mouseover', () => {
        let secondary_submenu = menu_info_primary[index];
        console.log(secondary_submenu);
        secondary_menu_links.textContent = '';

        secondary_submenu.forEach((secondary_link, index) => {
            let text = secondary_link.text;
            let href = secondary_link.href;
            let secondary_link_li = document.createElement('li');
            secondary_menu_links.append(secondary_link_li);
            let secondary_link_a = document.createElement('a');
            secondary_link_a.innerText = text;
            secondary_link_a.href = href;
            secondary_link_li.append(secondary_link_a);

        });

        let screen_width = window.innerWidth;
        // 			alert(screen_width);
        if (screen_width < 991) {
            console.log('Mobile design!');
            mobile_menu_container.classList.remove('full-width');
            mobile_menu_container.classList.add('zero-width');
            mobile_menu.classList.add('hide-element');
            secondary_menu_container.classList.remove('zero-width');
            secondary_menu_container.classList.add('secondary-mobile-menu');
            letter_two.classList.remove('hide-element');
            alert('secondary menu added');
        } else {
            secondary_menu_container.classList.add('full-width');
        }
    });
});




//hamburger and close button
hamburger.addEventListener('click', function() {
    hamburger.classList.remove('show-hamburger');
    hamburger.classList.add('hide-hamburger');
    mobile_menu_container.classList.add('full-width');
    mobile_menu_container.classList.add('full-height');
    mobile_menu.classList.remove('hide-element');
    mobile_menu.classList.add('mobile-menu');
    close_button.classList.remove('hide-element');
    close_button.classList.add('show-element');
    secondary_menu_container.classList.remove('hide-element');
    secondary_menu_container.classList.add('show-element');
    header_container.style.borderColor = "transparent";
    header_container.style.backgroundColor = "#000032";
    header_container.style.position = "fixed";
    mobile_menu_container.style.position = "fixed";
});
close_button.addEventListener('click', function() {
    mobile_menu_container.classList.remove('full-width');
    hamburger.classList.remove('hide-hamburger');
    hamburger.classList.add('show-hamburger');
    mobile_menu.classList.add('hide-element');
    mobile_menu.classList.remove('mobile-menu');
    close_button.classList.add('hide-element');
    close_button.classList.remove('show-element');
    secondary_menu_container.classList.remove('show-element');
    secondary_menu_container.classList.add('hide-element');
    header_container.style.backgroundColor = "transparent";
    header_container.style.position = "absolute";
    header_container.style.borderColor = "#fff";
    mobile_menu_container.style.position = "absolute";
    secondary_menu_container.classList.remove('full-width');
    secondary_menu_links.textContent = '';
    // 	mobile_menu_container.style.cssText=`width:100vw !important`;
    // 	mobile_menu.style.cssText=`display:block`;
    //	secondary_menu_container.style.cssText=`left:100%; width:0 !important`; 
    mobile_menu_container.classList.remove('zero-width');
    secondary_menu_container.classList.remove('secondary-mobile-menu');
    secondary_menu_container.classList.remove('full-width');
});