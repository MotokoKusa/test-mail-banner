"use strict"

const stickers = [
    {
        name: "sticker1",
        src: 'images/stickers/1.png',
        className: "sticker sticker1",
        zIndex: "15",
    },
    {
        name: "sticker2",
        src: 'images/stickers/2.png',
        className: "sticker sticker2",
        zIndex: "12",
    },
    {
        name: "sticker3",
        src: 'images/stickers/3.png',
        className: "sticker sticker3",
        zIndex: "11",
    },
    {
        name: "sticker4",
        src: 'images/stickers/4.png',
        className: "sticker sticker4",
        zIndex: "11",
    },
    {
        name: "sticker5",
        src: 'images/stickers/5.png',
        className: "sticker sticker5",
        zIndex: "10",
    },
    {
        name: "sticker6",
        src: 'images/stickers/6.png',
        className: "sticker sticker6",
        zIndex: "10",
    },
    {
        name: "sticker7",
        src: 'images/stickers/7.png',
        className: "sticker sticker7",
        zIndex: "20",
    },
    {
        name: "sticker8",
        src: 'images/stickers/8.png',
        className: "sticker sticker8",
        zIndex: "20",
    },
];
const COUNTER_PX_TO_HIDE_STICKER = 100;
let isHiddenNotification = false;
let isDragging = false;
let shiftX, shiftY;

function renderStickers(sticker) {
    const img = document.createElement('img');
    const wrapper = document.querySelector('.stickers');
    img.src = sticker.src;
    img.className = sticker.className;
    img.style.zIndex = sticker.zIndex;
    wrapper.append(img);
};

const hideNotification = (notification) => {
    notification.style.display = 'none';
    isHiddenNotification = true;
};

window.addEventListener("DOMContentLoaded", () => {
    const notificationBlock = document.querySelector('.notification');
    if (notificationBlock) {
        notificationBlock.style.opacity = '1';
        notificationBlock.addEventListener('click', (event) => {
            hideNotification(event.target);
        });
    };
    stickers.forEach((el) => {
        renderStickers(el);
        const sticker = document.querySelector(`.${el.name}`);
        const stickersWrap = document.querySelector('.stickers');

        sticker.addEventListener("mousedown", function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (!isHiddenNotification) {
                hideNotification(notificationBlock);
            };
            let startX = event.clientX;
            let startY = event.clientY;
            let origX = sticker.offsetLeft;
            let origY = sticker.offsetTop;

            document.addEventListener("mousemove", moveHandler, true);
            document.addEventListener("mouseup", endMoveHandler, true);

            function moveHandler(e) {
                let newX = origX + e.clientX - startX;
                let newY = origY + e.clientY - startY;

                const wrapCords = document.querySelector('.main')?.getBoundingClientRect();
                const targetCords = e.target.getBoundingClientRect();

                if (wrapCords.left > (targetCords.left + COUNTER_PX_TO_HIDE_STICKER)
                    || wrapCords.top > (targetCords.top + COUNTER_PX_TO_HIDE_STICKER)
                    || wrapCords.bottom < (targetCords.bottom)
                    || wrapCords.right < (targetCords.right - COUNTER_PX_TO_HIDE_STICKER)
                ) {
                    e.target.remove();
                    if (!stickersWrap.childNodes.length) {
                        stickersWrap.remove();
                    }
                    endMoveHandler();
                }
                sticker.style.left = newX + "px";
                sticker.style.top = newY + "px";
            }
            function endMoveHandler() {
                document.removeEventListener("mousemove", moveHandler, true);
                document.removeEventListener("mouseup", endMoveHandler, true);
            }
        }, true);
        sticker.addEventListener("touchstart", function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (!isHiddenNotification) {
                hideNotification(notificationBlock);
            };
            let startX = event.touches[0].clientX;
            let startY = event.touches[0].clientY;
            let origX = sticker.offsetLeft;
            let origY = sticker.offsetTop;

            document.addEventListener("touchmove", moveHandler, true);
            document.addEventListener("touchend", endMoveHandler, true);

            function moveHandler(e) {
                let newX = origX + e.touches[0].clientX - startX;
                let newY = origY + e.touches[0].clientY - startY;

                const wrapCords = document.querySelector('.main')?.getBoundingClientRect();
                const targetCords = e.target.getBoundingClientRect();

                if (wrapCords.left > (targetCords.left + COUNTER_PX_TO_HIDE_STICKER)
                    || wrapCords.top > (targetCords.top + COUNTER_PX_TO_HIDE_STICKER)
                    || wrapCords.bottom < (targetCords.bottom)
                    || wrapCords.right < (targetCords.right - COUNTER_PX_TO_HIDE_STICKER)
                ) {
                    e.target.remove();
                    if (!stickersWrap.childNodes.length) {
                        stickersWrap.remove();
                    }
                    endMoveHandler();
                }
                sticker.style.left = newX + "px";
                sticker.style.top = newY + "px";
            }
            function endMoveHandler() {
                document.removeEventListener("touchmove", moveHandler, true);
                document.removeEventListener("touchend", endMoveHandler, true);
            }
        }, true);
    });
});
