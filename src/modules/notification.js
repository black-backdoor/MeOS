/**
    @param {string} name - name of the notification
    @param {string} content - content of the notification
    @param {string} icon - icon of the notification
    @param {string} app_name - name of the app
    @param {string} app_icon - icon of the app
    @param {boolean} push - should the notification appear on the desktop or not (default: false)
*/
function sendNotification (
    name,
    content,
    icon,
    app_name,
    app_icon,
    push = false
) {
    const date_sent = new Date().toISOString();
    saveNotification({ name, content, icon, app_name, app_icon, date_sent });

    if (push) {
        const push_container = document.querySelector("#push-notifications");
    
        // CREATE NOTIFICATION
        const notification = document.createElement("desktop-notification");
        notification.setAttribute("name", name);
        notification.setAttribute("content", content);
        if ( icon !== undefined ) notification.setAttribute("icon", icon);
        if ( app_name !== undefined ) notification.setAttribute("app-name", app_name);
        if ( app_icon !== undefined ) notification.setAttribute("app-icon", app_icon);
        
        notification.setAttribute("time-alive", 10000);
        push_container.appendChild(notification);
    }

    
}


export default sendNotification;








function getNotifications () {
    const notifications = window.localStorage.getItem("notifications");
    return notifications === null ? [] : JSON.parse(notifications);
}

function setNotifications (data) {
    window.localStorage.setItem("notifications", JSON.stringify(data));
}

function saveNotification (data) {
    if (data.name === undefined) throw new Error("Failed to save notification: notification.name is required");;
    if (data.content === undefined) throw new Error("Failed to save notification: notification.content is required");
    
    const notifications = getNotifications();
    notifications.push(data);
    setNotifications(notifications);
}

export { getNotifications };