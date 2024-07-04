/* UI FUNCTIONALITY */

document.addEventListener("DOMContentLoaded", function() {
    const clear_all_button = document.querySelector("#action-menu .notifications button.clear-all");
    const notifications = document.querySelectorAll("#action-menu .notifications .list");
    
    clear_all_button.addEventListener("click", function() {
        console.debug("clear all notifications");
        notifications.forEach(notification => {
            notification.innerHTML = "";
        });
        saveNotifications();
    });
});


function saveNotifications() {
    const notifications = document.querySelector("#action-menu .notifications .list");
    console.debug("save notifications", notifications.innerHTML);
    sessionStorage.setItem("notifications", notifications.innerHTML);
}

function loadNotifications() {
    const notifications = document.querySelector("#action-menu .notifications .list");
    notifications.innerHTML = sessionStorage.getItem("notifications");
}

document.addEventListener("DOMContentLoaded", loadNotifications);  // load notifications on page load
document.addEventListener("DOMContentLoaded" , function() { setInterval(saveNotifications, 30000); });  // save notifications every 30 seconds

// save notifications on click (probably when close button is clicked)
document.addEventListener("DOMContentLoaded", function() {
    const notifications = document.querySelector("#action-menu .notifications");
    notifications.addEventListener("click", function(e) {
        saveNotifications();
    });
});




/*
    @param {string} name - name of the app
    @param {string} icon - icon of the app
*/
function createAppGroup(name, icon) {
    const action_menu_list = document.querySelector("#action-menu .notifications .list");

    const app_group = document.createElement("notifications-app");
    app_group.setAttribute("name", name);
    if ( icon !== undefined ) app_group.setAttribute("icon", icon);

    action_menu_list.appendChild(app_group);
}

/*
    @param {string} name - name of the notification
    @param {string} content - content of the notification
    @param {string} icon - icon of the notification
    @param {string} appname - name of the app
    @param {string} appicon - icon of the app
    @param {boolean} push - should the notification appear on the desktop or not (default: false)
*/
function sendNotification(name, content, icon, appname, appicon, push = false) {
    const push_container = document.querySelector("#push-notifications");
    const action_menu_list = document.querySelector("#action-menu .notifications .list");

    // PUSH NOTIFICATION (IF NEEDED)
    if (push) {        
        // CREATE NOTIFICATION
        const notification = document.createElement("desktop-notification");
        notification.setAttribute("name", name);
        notification.setAttribute("content", content);
        if ( icon !== undefined ) notification.setAttribute("icon", icon);
        if ( appname !== undefined ) notification.setAttribute("app-name", appname);
        if ( appicon !== undefined ) notification.setAttribute("app-icon", appicon);
        
        notification.setAttribute("time-alive", "10000");  // hide after 10 seconds
        push_container.appendChild(notification);
        
    }

    // CREATE NOTIFICATION
    const notification = document.createElement("desktop-notification");
    notification.setAttribute("name", name);
    notification.setAttribute("content", content);
    if ( icon !== undefined ) notification.setAttribute("icon", icon);
    if ( appname !== undefined ) notification.setAttribute("app-name", appname);
    if ( appicon !== undefined ) notification.setAttribute("app-icon", appicon);
    
    // CREATE APP GROUP (IF NEEDED)
    const app_groups = action_menu_list.querySelectorAll("notifications-app");

    let found = false;
    console.debug("app_groups", app_groups);

    app_groups.forEach(group => {
        // if app group is found, add notification to the group
        if (group.getAttribute("name") === appname) {
            console.debug("[NOTIFICATIONS] add notification to app group", appname);
            group.appendChild(notification);

            // set icon if not already set
            if (group.getAttribute("icon") === undefined && appicon !== undefined) {
                console.debug("[NOTIFICATIONS] update icon for app group", appname, appicon);
                group.setAttribute("icon", appicon);
            }
            found = true;
            return;
        }
    });

    
    if (!found && appname !== undefined) {
        // if no app group is found, create a new one
        createAppGroup(appname, appicon);

        // get the newly created app group
        const app_groups = action_menu_list.querySelectorAll("notifications-app");
        app_groups.forEach(group => {
            // if app group is found, add notification to the group
            if (group.getAttribute("name") === appname) {
                console.debug("[NOTIFICATIONS] add notification to app group", appname);
                group.appendChild(notification);
                found = true;
                return;
            }
        });
    } else if (!found) {
        console.debug("no app group found, adding to action menu list directly");
        // if no appname is provided, add to the action menu list directly (without grouping)
        action_menu_list.appendChild(notification);
    }


    saveNotifications();
}
