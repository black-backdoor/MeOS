document.addEventListener('DOMContentLoaded', function() {
    const actionMenu = document.querySelector('#action-menu .notifications');
    const clearAllButton = actionMenu.querySelector('.clear-all');
    const notificationList = actionMenu.querySelector('.notification-list');

    clearAllButton.addEventListener('click', function(event) {
        // clear all notifications
        notificationList.innerHTML = '';
    });

    notificationList.addEventListener('click', function(event) {
        // if there is a click in the notification list -> removed a notification | remove the app if there are no notifications left
        let apps = notificationList.querySelectorAll('.app');
        apps.forEach(app => {
            if (app.children.length <= 1) {
                app.remove();
            }
        });
    });

    const pushNotifications = document.getElementById('push-notifications');

    function appExists(appName) {
        let element;

        notificationList.querySelectorAll('.app p').forEach(app => {
            if (app.innerText === appName) {
                element = app.closest('.app');
            }
        });

        return element;
    }

    function sendNotification(title, message, appName = undefined, appIcon = undefined, icon = undefined, push = true) {
        let pushHtml = `<desktop-notification time="${new Date().getUTCDate()}" push="true" name="${title}" content="${message}" ${appName ? `app-name="${appName}"` : ''} ${appIcon ? `app-icon="${appIcon}"` : ''} ${icon ? `icon="${icon}"` : ''}></desktop-notification>`;
        let html = `<desktop-notification name="${title}" content="${message}" ${appName ? `app-name="${appName}"` : ''} ${icon ? `icon="${icon}"` : ''}></desktop-notification>`;

        if (push) {
            pushNotifications.innerHTML += pushHtml;
        }

        if (appName) {
            let app = appExists(appName);
            if (app) {
                app.innerHTML += html;
                return;
            } else {
                notificationList.innerHTML += `<div class="app"><header>${appIcon ? `<img src="${appIcon}">` : ''}<p>${appName}</p></header>${html}</div>`;
                return;
            }
        }

        notificationList.innerHTML += html;
    }

    /*
    sendNotification("Account", "Connection to remote Server established.");
    sendNotification("Account", "Connection to remote Server established.", "Firefox", "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+RmlyZWZveCBCcm93c2VyPC90aXRsZT48cGF0aCBkPSJNOC44MjQgNy4yODdjLjAwOCAwIC4wMDQgMCAwIDB6bS0yLjgtMS40Yy4wMDYgMCAuMDAzIDAgMCAwem0xNi43NTQgMi4xNjFjLS41MDUtMS4yMTUtMS41My0yLjUyOC0yLjMzMy0yLjk0My42NTQgMS4yODMgMS4wMzMgMi41NyAxLjE3NyAzLjUzbC4wMDIuMDJjLTEuMzE0LTMuMjc4LTMuNTQ0LTQuNi01LjM2Ni03LjQ3Ny0uMDkxLS4xNDctLjE4NC0uMjkyLS4yNzMtLjQ0NmEzLjU0NSAzLjU0NSAwIDAxLS4xMy0uMjQgMi4xMTggMi4xMTggMCAwMS0uMTcyLS40Ni4wMy4wMyAwIDAwLS4wMjctLjAzLjAzOC4wMzggMCAwMC0uMDIxIDBsLS4wMDYuMDAxYS4wMzcuMDM3IDAgMDAtLjAxLjAwNUwxNS42MjQgMGMtMi41ODUgMS41MTUtMy42NTcgNC4xNjgtMy45MzIgNS44NTZhNi4xOTcgNi4xOTcgMCAwMC0yLjMwNS41ODcuMjk3LjI5NyAwIDAwLS4xNDcuMzdjLjA1Ny4xNjIuMjQuMjQuMzk2LjE3YTUuNjIyIDUuNjIyIDAgMDEyLjAwOC0uNTIzbC4wNjctLjAwNWE1Ljg0NyA1Ljg0NyAwIDAxMS45NTcuMjIybC4wOTUuMDNhNS44MTYgNS44MTYgMCAwMS42MTYuMjI4Yy4wOC4wMzYuMTYuMDczLjIzOC4xMTJsLjEwNy4wNTVhNS44MzUgNS44MzUgMCAwMS4zNjguMjExIDUuOTUzIDUuOTUzIDAgMDEyLjAzNCAyLjEwNGMtLjYyLS40MzctMS43MzMtLjg2OC0yLjgwMy0uNjgxIDQuMTgzIDIuMDkgMy4wNiA5LjI5Mi0yLjczNyA5LjAyYTUuMTY0IDUuMTY0IDAgMDEtMS41MTMtLjI5MiA0LjQyIDQuNDIgMCAwMS0uNTM4LS4yMzJjLTEuNDItLjczNS0yLjU5My0yLjEyMS0yLjc0LTMuODA2IDAgMCAuNTM3LTIgMy44NDUtMiAuMzU3IDAgMS4zOC0uOTk4IDEuMzk4LTEuMjg3LS4wMDUtLjA5NS0yLjAyOS0uOS0yLjgxNy0xLjY3Ny0uNDIyLS40MTYtLjYyMi0uNjE2LS44LS43NjdhMy40NyAzLjQ3IDAgMDAtLjMwMS0uMjI3IDUuMzg4IDUuMzg4IDAgMDEtLjAzMi0yLjg0MmMtMS4xOTUuNTQ0LTIuMTI0IDEuNDAzLTIuOCAyLjE2M2gtLjAwNmMtLjQ2LS41ODQtLjQyOC0yLjUxLS40MDItMi45MTMtLjAwNi0uMDI1LS4zNDMuMTc2LS4zODkuMjA2LS40MDYuMjktLjc4Ny42MTYtMS4xMzYuOTc0LS4zOTcuNDAzLS43Ni44MzktMS4wODUgMS4zMDNhOS44MTYgOS44MTYgMCAwMC0xLjU2MiAzLjUyYy0uMDAzLjAxMy0uMTEuNDg3LS4xOSAxLjA3My0uMDEzLjA5LS4wMjYuMTgxLS4wMzcuMjcyYTcuOCA3LjggMCAwMC0uMDY5LjY2N2wtLjAwMi4wMzQtLjAyMy4zODctLjAwMS4wNkMuMzg2IDE4Ljc5NSA1LjU5MyAyNCAxMi4wMTYgMjRjNS43NTIgMCAxMC41MjctNC4xNzYgMTEuNDYzLTkuNjYxLjAyLS4xNDkuMDM1LS4yOTguMDUyLS40NDguMjMyLTEuOTk0LS4wMjUtNC4wOS0uNzUzLTUuODQ0eiIvPjwvc3ZnPg==", "/assets/connection/wifi.svg". true);
    setTimeout(() => {
    sendNotification(
        "Update",
        "New version available",
        "Files",
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjA0OHB4IiBoZWlnaHQ9IjIwNDhweCIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDIwNDggMjA0OCINCiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMCB7ZmlsbDpub25lfQ0KICAgIC5maWw1IHtmaWxsOiNCREJEQkR9DQogICAgLmZpbDIge2ZpbGw6I0ZGQTAwMH0NCiAgICAuZmlsMSB7ZmlsbDojRkZCMzAwfQ0KICAgIC5maWw0IHtmaWxsOiNGRkQ1NEZ9DQogICAgLmZpbDMge2ZpbGw6d2hpdGV9DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9IkxheWVyX3gwMDIwXzEiPg0KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPg0KICA8cmVjdCBjbGFzcz0iZmlsMCIgd2lkdGg9IjIwNDgiIGhlaWdodD0iMjA0OCIvPg0KICA8cmVjdCBjbGFzcz0iZmlsMCIgeD0iMjU1Ljk5OSIgeT0iMjU1Ljk5OSIgd2lkdGg9IjE1MzYiIGhlaWdodD0iMTUzNiIvPg0KICA8cmVjdCBjbGFzcz0iZmlsMCIgeD0iMjU1Ljk5OSIgeT0iMjU2IiB3aWR0aD0iMTUzNiIgaGVpZ2h0PSIxNTM2Ii8+DQogIDxnIGlkPSJfMzQ3MzAzNTc2Ij4NCiAgIDxwYXRoIGlkPSJfMzQ3MzA3NDQwIiBjbGFzcz0iZmlsMSIgZD0iTTI1NS45OTkgNDY2LjQ2NmwxNDQ4LjAyIDBjNDguMzkxLDAgODcuOTgyNywzOS41OTUzIDg3Ljk4MjcsODcuOTgyN2wwIDEwNDQuMzdjMCw0OC4zOTEgLTM5LjU5NTMsODcuOTgyNyAtODcuOTgyNyw4Ny45ODI3bC0xMzYwLjA0IDBjLTQ4LjM4NzQsMCAtODcuOTgyNywtMzkuNTg4MiAtODcuOTgyNywtODcuOTgyN2wwIC0xMTMyLjM1eiIvPg0KICAgPHBhdGggaWQ9Il8zNDczMDM2NzIiIGNsYXNzPSJmaWwyIiBkPSJNMzEyLjg3IDM2MS4xOThsNjI1LjQ3MiAwYzMxLjI4MTUsMCA1Ni44NzAxLDI2LjM5NTMgNTYuODcwMSw1OC42NTQ4bDAgNDYuNjExMSAtNzM5LjIxMiAwIDAgLTQ2LjYxMTFjMCwtMzIuMjYzIDI1LjU4ODYsLTU4LjY1NDggNTYuODcwMSwtNTguNjU0OHoiLz4NCiAgIDxwb2x5Z29uIGlkPSJfMzQ3Mjk4NDY0IiBjbGFzcz0iZmlsMyIgcG9pbnRzPSI3MjMuOTE0LDUxNi43NzUgMTQyMC4yNSw1MTYuNzc1IDE0MjAuMjUsMTU4OC40MSA2MjUuMDcyLDE1ODguNDEgNjI1LjA3Miw2MDYuNDQyICIvPg0KICAgPHBhdGggaWQ9Il8zNDczMDEyMjQiIGNsYXNzPSJmaWw0IiBkPSJNMzQxLjMwMyA3NDUuNTUxbDU2NS41MDIgMCAxMTkuNTEzIC05Ni4wMzA4IDY3Ny42OTcgMGM0Ni45MTkzLDAgODUuMzA0LDM5LjYwMzYgODUuMzA0LDg3Ljk4MDRsMCA4NjEuMzIyYzAsNDguMzc2OCAtMzguMzk4OCw4Ny45ODA0IC04NS4zMDQsODcuOTgwNGwtMTM2Mi43MSAwYy00Ni45MDg3LDAgLTg1LjMwNCwtMzkuNTg5NCAtODUuMzA0LC04Ny45ODA0bDAgLTc2NS4yOWMwLC00OC4zOTIyIDM4LjM4NDcsLTg3Ljk4MTYgODUuMzA0LC04Ny45ODE2eiIvPg0KICAgPHBvbHlnb24gaWQ9Il8zNDcyOTk2NDAiIGNsYXNzPSJmaWw1IiBwb2ludHM9IjcyMy4wOTksNjA3LjQ0NSA2MjUuMDcyLDYwNi40NDIgNzIzLjA5OSw1MTYuNzc5ICIvPg0KICA8L2c+DQogPC9nPg0KPC9zdmc+DQo=",
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMjA0OHB4IiBoZWlnaHQ9IjIwNDhweCIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDIwNDggMjA0OCINCiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMCB7ZmlsbDpub25lfQ0KICAgIC5maWw1IHtmaWxsOiNCREJEQkR9DQogICAgLmZpbDIge2ZpbGw6I0ZGQTAwMH0NCiAgICAuZmlsMSB7ZmlsbDojRkZCMzAwfQ0KICAgIC5maWw0IHtmaWxsOiNGRkQ1NEZ9DQogICAgLmZpbDMge2ZpbGw6d2hpdGV9DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9IkxheWVyX3gwMDIwXzEiPg0KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPg0KICA8cmVjdCBjbGFzcz0iZmlsMCIgd2lkdGg9IjIwNDgiIGhlaWdodD0iMjA0OCIvPg0KICA8cmVjdCBjbGFzcz0iZmlsMCIgeD0iMjU1Ljk5OSIgeT0iMjU1Ljk5OSIgd2lkdGg9IjE1MzYiIGhlaWdodD0iMTUzNiIvPg0KICA8cmVjdCBjbGFzcz0iZmlsMCIgeD0iMjU1Ljk5OSIgeT0iMjU2IiB3aWR0aD0iMTUzNiIgaGVpZ2h0PSIxNTM2Ii8+DQogIDxnIGlkPSJfMzQ3MzAzNTc2Ij4NCiAgIDxwYXRoIGlkPSJfMzQ3MzA3NDQwIiBjbGFzcz0iZmlsMSIgZD0iTTI1NS45OTkgNDY2LjQ2NmwxNDQ4LjAyIDBjNDguMzkxLDAgODcuOTgyNywzOS41OTUzIDg3Ljk4MjcsODcuOTgyN2wwIDEwNDQuMzdjMCw0OC4zOTEgLTM5LjU5NTMsODcuOTgyNyAtODcuOTgyNyw4Ny45ODI3bC0xMzYwLjA0IDBjLTQ4LjM4NzQsMCAtODcuOTgyNywtMzkuNTg4MiAtODcuOTgyNywtODcuOTgyN2wwIC0xMTMyLjM1eiIvPg0KICAgPHBhdGggaWQ9Il8zNDczMDM2NzIiIGNsYXNzPSJmaWwyIiBkPSJNMzEyLjg3IDM2MS4xOThsNjI1LjQ3MiAwYzMxLjI4MTUsMCA1Ni44NzAxLDI2LjM5NTMgNTYuODcwMSw1OC42NTQ4bDAgNDYuNjExMSAtNzM5LjIxMiAwIDAgLTQ2LjYxMTFjMCwtMzIuMjYzIDI1LjU4ODYsLTU4LjY1NDggNTYuODcwMSwtNTguNjU0OHoiLz4NCiAgIDxwb2x5Z29uIGlkPSJfMzQ3Mjk4NDY0IiBjbGFzcz0iZmlsMyIgcG9pbnRzPSI3MjMuOTE0LDUxNi43NzUgMTQyMC4yNSw1MTYuNzc1IDE0MjAuMjUsMTU4OC40MSA2MjUuMDcyLDE1ODguNDEgNjI1LjA3Miw2MDYuNDQyICIvPg0KICAgPHBhdGggaWQ9Il8zNDczMDEyMjQiIGNsYXNzPSJmaWw0IiBkPSJNMzQxLjMwMyA3NDUuNTUxbDU2NS41MDIgMCAxMTkuNTEzIC05Ni4wMzA4IDY3Ny42OTcgMGM0Ni45MTkzLDAgODUuMzA0LDM5LjYwMzYgODUuMzA0LDg3Ljk4MDRsMCA4NjEuMzIyYzAsNDguMzc2OCAtMzguMzk4OCw4Ny45ODA0IC04NS4zMDQsODcuOTgwNGwtMTM2Mi43MSAwYy00Ni45MDg3LDAgLTg1LjMwNCwtMzkuNTg5NCAtODUuMzA0LC04Ny45ODA0bDAgLTc2NS4yOWMwLC00OC4zOTIyIDM4LjM4NDcsLTg3Ljk4MTYgODUuMzA0LC04Ny45ODE2eiIvPg0KICAgPHBvbHlnb24gaWQ9Il8zNDcyOTk2NDAiIGNsYXNzPSJmaWw1IiBwb2ludHM9IjcyMy4wOTksNjA3LjQ0NSA2MjUuMDcyLDYwNi40NDIgNzIzLjA5OSw1MTYuNzc5ICIvPg0KICA8L2c+DQogPC9nPg0KPC9zdmc+DQo="
    )}, 5000);
    */
});
