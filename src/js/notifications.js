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
        
        notification.setAttribute("time-alive", "5000");  // hide after 5 seconds
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
            group.appendChild(notification);

            // set icon if not already set
            if (group.getAttribute("icon") === undefined && appicon !== undefined) {
                group.setAttribute("icon", appicon);
            }
            found = true;
            return;
        }
    });

    console.debug("notification group found?: ", found);

    
    if (!found && appname !== undefined) {
        // if no app group is found, create a new one
        createAppGroup(appname, appicon);

        // get the newly created app group
        const app_groups = action_menu_list.querySelectorAll("notifications-app");
        app_groups.forEach(group => {
            // if app group is found, add notification to the group
            if (group.getAttribute("name") === appname) {
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
    
}

document.addEventListener("DOMContentLoaded", () => {
    sendNotification(
        "Welcome to MeOS!",
        "This is a simple operating system built with HTML, CSS, and JavaScript.",
        undefined,
        "Firefox",
        undefined,
        true
    ); 

    sendNotification(
        "Welcome to MeOS!",
        "This is a simple operating system built with HTML, CSS, and JavaScript.",
        undefined,
        "Firefox",
        "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+RmlyZWZveCBCcm93c2VyPC90aXRsZT48cGF0aCBkPSJNOC44MjQgNy4yODdjLjAwOCAwIC4wMDQgMCAwIDB6bS0yLjgtMS40Yy4wMDYgMCAuMDAzIDAgMCAwem0xNi43NTQgMi4xNjFjLS41MDUtMS4yMTUtMS41My0yLjUyOC0yLjMzMy0yLjk0My42NTQgMS4yODMgMS4wMzMgMi41NyAxLjE3NyAzLjUzbC4wMDIuMDJjLTEuMzE0LTMuMjc4LTMuNTQ0LTQuNi01LjM2Ni03LjQ3Ny0uMDkxLS4xNDctLjE4NC0uMjkyLS4yNzMtLjQ0NmEzLjU0NSAzLjU0NSAwIDAxLS4xMy0uMjQgMi4xMTggMi4xMTggMCAwMS0uMTcyLS40Ni4wMy4wMyAwIDAwLS4wMjctLjAzLjAzOC4wMzggMCAwMC0uMDIxIDBsLS4wMDYuMDAxYS4wMzcuMDM3IDAgMDAtLjAxLjAwNUwxNS42MjQgMGMtMi41ODUgMS41MTUtMy42NTcgNC4xNjgtMy45MzIgNS44NTZhNi4xOTcgNi4xOTcgMCAwMC0yLjMwNS41ODcuMjk3LjI5NyAwIDAwLS4xNDcuMzdjLjA1Ny4xNjIuMjQuMjQuMzk2LjE3YTUuNjIyIDUuNjIyIDAgMDEyLjAwOC0uNTIzbC4wNjctLjAwNWE1Ljg0NyA1Ljg0NyAwIDAxMS45NTcuMjIybC4wOTUuMDNhNS44MTYgNS44MTYgMCAwMS42MTYuMjI4Yy4wOC4wMzYuMTYuMDczLjIzOC4xMTJsLjEwNy4wNTVhNS44MzUgNS44MzUgMCAwMS4zNjguMjExIDUuOTUzIDUuOTUzIDAgMDEyLjAzNCAyLjEwNGMtLjYyLS40MzctMS43MzMtLjg2OC0yLjgwMy0uNjgxIDQuMTgzIDIuMDkgMy4wNiA5LjI5Mi0yLjczNyA5LjAyYTUuMTY0IDUuMTY0IDAgMDEtMS41MTMtLjI5MiA0LjQyIDQuNDIgMCAwMS0uNTM4LS4yMzJjLTEuNDItLjczNS0yLjU5My0yLjEyMS0yLjc0LTMuODA2IDAgMCAuNTM3LTIgMy44NDUtMiAuMzU3IDAgMS4zOC0uOTk4IDEuMzk4LTEuMjg3LS4wMDUtLjA5NS0yLjAyOS0uOS0yLjgxNy0xLjY3Ny0uNDIyLS40MTYtLjYyMi0uNjE2LS44LS43NjdhMy40NyAzLjQ3IDAgMDAtLjMwMS0uMjI3IDUuMzg4IDUuMzg4IDAgMDEtLjAzMi0yLjg0MmMtMS4xOTUuNTQ0LTIuMTI0IDEuNDAzLTIuOCAyLjE2M2gtLjAwNmMtLjQ2LS41ODQtLjQyOC0yLjUxLS40MDItMi45MTMtLjAwNi0uMDI1LS4zNDMuMTc2LS4zODkuMjA2LS40MDYuMjktLjc4Ny42MTYtMS4xMzYuOTc0LS4zOTcuNDAzLS43Ni44MzktMS4wODUgMS4zMDNhOS44MTYgOS44MTYgMCAwMC0xLjU2MiAzLjUyYy0uMDAzLjAxMy0uMTEuNDg3LS4xOSAxLjA3My0uMDEzLjA5LS4wMjYuMTgxLS4wMzcuMjcyYTcuOCA3LjggMCAwMC0uMDY5LjY2N2wtLjAwMi4wMzQtLjAyMy4zODctLjAwMS4wNkMuMzg2IDE4Ljc5NSA1LjU5MyAyNCAxMi4wMTYgMjRjNS43NTIgMCAxMC41MjctNC4xNzYgMTEuNDYzLTkuNjYxLjAyLS4xNDkuMDM1LS4yOTguMDUyLS40NDguMjMyLTEuOTk0LS4wMjUtNC4wOS0uNzUzLTUuODQ0eiIvPjwvc3ZnPg==",
        true
    );  

    sendNotification(
        "Welcome to MeOS!",
        "This is a simple operating system built with HTML, CSS, and JavaScript.",
        undefined,
        "Firefox2",
        "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+RmlyZWZveCBCcm93c2VyPC90aXRsZT48cGF0aCBkPSJNOC44MjQgNy4yODdjLjAwOCAwIC4wMDQgMCAwIDB6bS0yLjgtMS40Yy4wMDYgMCAuMDAzIDAgMCAwem0xNi43NTQgMi4xNjFjLS41MDUtMS4yMTUtMS41My0yLjUyOC0yLjMzMy0yLjk0My42NTQgMS4yODMgMS4wMzMgMi41NyAxLjE3NyAzLjUzbC4wMDIuMDJjLTEuMzE0LTMuMjc4LTMuNTQ0LTQuNi01LjM2Ni03LjQ3Ny0uMDkxLS4xNDctLjE4NC0uMjkyLS4yNzMtLjQ0NmEzLjU0NSAzLjU0NSAwIDAxLS4xMy0uMjQgMi4xMTggMi4xMTggMCAwMS0uMTcyLS40Ni4wMy4wMyAwIDAwLS4wMjctLjAzLjAzOC4wMzggMCAwMC0uMDIxIDBsLS4wMDYuMDAxYS4wMzcuMDM3IDAgMDAtLjAxLjAwNUwxNS42MjQgMGMtMi41ODUgMS41MTUtMy42NTcgNC4xNjgtMy45MzIgNS44NTZhNi4xOTcgNi4xOTcgMCAwMC0yLjMwNS41ODcuMjk3LjI5NyAwIDAwLS4xNDcuMzdjLjA1Ny4xNjIuMjQuMjQuMzk2LjE3YTUuNjIyIDUuNjIyIDAgMDEyLjAwOC0uNTIzbC4wNjctLjAwNWE1Ljg0NyA1Ljg0NyAwIDAxMS45NTcuMjIybC4wOTUuMDNhNS44MTYgNS44MTYgMCAwMS42MTYuMjI4Yy4wOC4wMzYuMTYuMDczLjIzOC4xMTJsLjEwNy4wNTVhNS44MzUgNS44MzUgMCAwMS4zNjguMjExIDUuOTUzIDUuOTUzIDAgMDEyLjAzNCAyLjEwNGMtLjYyLS40MzctMS43MzMtLjg2OC0yLjgwMy0uNjgxIDQuMTgzIDIuMDkgMy4wNiA5LjI5Mi0yLjczNyA5LjAyYTUuMTY0IDUuMTY0IDAgMDEtMS41MTMtLjI5MiA0LjQyIDQuNDIgMCAwMS0uNTM4LS4yMzJjLTEuNDItLjczNS0yLjU5My0yLjEyMS0yLjc0LTMuODA2IDAgMCAuNTM3LTIgMy44NDUtMiAuMzU3IDAgMS4zOC0uOTk4IDEuMzk4LTEuMjg3LS4wMDUtLjA5NS0yLjAyOS0uOS0yLjgxNy0xLjY3Ny0uNDIyLS40MTYtLjYyMi0uNjE2LS44LS43NjdhMy40NyAzLjQ3IDAgMDAtLjMwMS0uMjI3IDUuMzg4IDUuMzg4IDAgMDEtLjAzMi0yLjg0MmMtMS4xOTUuNTQ0LTIuMTI0IDEuNDAzLTIuOCAyLjE2M2gtLjAwNmMtLjQ2LS41ODQtLjQyOC0yLjUxLS40MDItMi45MTMtLjAwNi0uMDI1LS4zNDMuMTc2LS4zODkuMjA2LS40MDYuMjktLjc4Ny42MTYtMS4xMzYuOTc0LS4zOTcuNDAzLS43Ni44MzktMS4wODUgMS4zMDNhOS44MTYgOS44MTYgMCAwMC0xLjU2MiAzLjUyYy0uMDAzLjAxMy0uMTEuNDg3LS4xOSAxLjA3My0uMDEzLjA5LS4wMjYuMTgxLS4wMzcuMjcyYTcuOCA3LjggMCAwMC0uMDY5LjY2N2wtLjAwMi4wMzQtLjAyMy4zODctLjAwMS4wNkMuMzg2IDE4Ljc5NSA1LjU5MyAyNCAxMi4wMTYgMjRjNS43NTIgMCAxMC41MjctNC4xNzYgMTEuNDYzLTkuNjYxLjAyLS4xNDkuMDM1LS4yOTguMDUyLS40NDguMjMyLTEuOTk0LS4wMjUtNC4wOS0uNzUzLTUuODQ0eiIvPjwvc3ZnPg==",
        true
    );

    sendNotification(
        "Welcome to MeOS!",
        "This is a simple operating system built with HTML, CSS, and JavaScript.",
        undefined,
        "Firefox3",
        undefined,
        true
    ); 
    sendNotification(
        "Welcome to MeOS! not found",
        "This is a simple operating system built with HTML, CSS, and JavaScript.",
        undefined,
        undefined,
        undefined,
        true
    ); 
});