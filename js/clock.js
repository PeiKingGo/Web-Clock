// 获取指针及表盘元素
let secondHand = document.querySelector(".secondHand");
let minuteHand = document.querySelector(".minuteHand");
let hourHand = document.querySelector(".hourHand");
let liveClock = document.querySelector(".liveCircle");
let outClock = document.getElementById("outCircle");
let inClock = document.getElementById("inCircle");
let hourText = document.querySelector("#hour");
let minuteText = document.querySelector("#minute");
let secondText = document.querySelector("#second");
let lable = document.querySelector("text");

// 获取按钮元素
let clockBtn = document.getElementById("clockBtn");
let secondBtn = document.getElementById("secondBtn");
let timerBtn = document.getElementById("timerBtn");
let alarmBtn = document.getElementById("alarmBtn");
let clockBtnBack = document.querySelector("#clockBtn .bar");
let secondBtnBack = document.querySelector("#secondBtn .bar");
let timerBtnBack = document.querySelector("#timerBtn .bar");
let alarmBtnBack = document.querySelector("#alarmBtn .bar");

// 时钟相关按钮及输入
let settingBtn = document.getElementById("settingBtn");
let clockInput = document.getElementById("clockInput");
let clockItems = document.getElementById("clockItems");

btn_list = [clockBtn, secondBtn, timerBtn, alarmBtn];
btn_hover_list = [clockBtnBack, secondBtnBack, timerBtnBack, alarmBtnBack];
// btnChosen = clockBtn;
class Clock {
    constructor(hour, minute, second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.secondAngle = second * 6;
        this.minuteAngle = minute * 6 + second * 0.1;
        this.hourAngle =
            hour * 30 + minute * 0.5 + second * 0.008333333333333333;
        if (hour > 12) {
            this.state = "PM";
            lable.innerHTML = "PM";
        } else {
            this.state = "AM";
            lable.innerHTML = "AM";
        }
    }
    update_angle_via_time() {
        this.secondAngle = this.second * 6;
        this.minuteAngle = this.minute * 6 + this.second * 0.1;
        this.hourAngle =
            (this.hour % 12) * 30 +
            this.minute * 0.5 +
            this.second * 0.008333333333333333;
    }
    update_time_via_angle() {
        this.second = parseInt(this.secondAngle / 6);
        // 计算分钟数
        this.minute = parseInt(this.minuteAngle / 6);
        // 计算小时数
        this.hour = parseInt(this.hourAngle / 30);
        if (this.state === "PM") {
            this.hour += 12;
            this.hour %= 24;
            if (this.hour === 0) {
                this.hour = 12;
            }
        }
    }
    set_time(hour, minute, second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        if (hour > 12) {
            this.state = "PM";
            lable.innerHTML = "PM";
        } else {
            this.state = "AM";
            lable.innerHTML = "AM";
        }
        this.update_angle_via_time();
    }
    set_angle(hourAngle, minuteAngle, secondAngle, state) {
        this.hourAngle = hourAngle;
        this.minuteAngle = minuteAngle;
        this.secondAngle = secondAngle;
        this.state = state;
        this.update_time_via_angle();
    }
}

function get_current_clock() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    return new Clock(hour, minute, second);
}

let clock = get_current_clock();

function run_clock() {
    clock.second += 1;
    // 如果秒数大于等于60，秒数归零，分钟数加1
    if (clock.second >= 60) {
        clock.second = 0;
        clock.minute += 1;
        // 如果分钟数大于等于60，分钟数归零，小时数加1
        if (clock.minute >= 60) {
            clock.minute = 0;
            clock.hour += 1;
            if (clock.hour === 12) change_state();
            // 如果小时数大于等于24，小时数归零
            if (clock.hour >= 24) {
                clock.hour = 0;
                if (clock.state === "PM") {
                    change_state();
                }
            }
        }
    }
    // 更新指针角度
    clock.update_angle_via_time();
    update_time_text();
}

var clock_start = null;

function stop_animation() {
    // 从类hourHand中移除类playHour，其余同理
    hourHand.classList.remove("playHour");
    minuteHand.classList.remove("playMinute");
    secondHand.classList.remove("playSecond");
    liveClock.classList.remove("playSecond");
}

function start_animation() {
    // 在类hourHand中加入类playHour，其余同理
    hourHand.classList.add("playHour");
    minuteHand.classList.add("playMinute");
    secondHand.classList.add("playSecond");
    liveClock.classList.add("playSecond");
}

function second_mousemove(event) {
    // 计算当前鼠标相对元素的位置与元素中心点向上的夹角（角度制）
    let angle =
        (-Math.atan2(125 - event.offsetX, 125 - event.offsetY) * 180) / Math.PI;
    angle.toFixed(2);
    secondHand.setAttribute("style", "rotate: " + angle + "deg");
    clock.secondAngle = angle;
    if (angle < 0) clock.secondAngle += 360;
    clock.update_time_via_angle();
    update_time_text();
    set_new_angle();
    angle += 180;
    liveClock.setAttribute("style", "rotate: " + angle + "deg");
    outClock.onmouseup = mouseup;
    inClock.onmouseup = mouseup;
    liveClock.onmouseup = mouseup;
    secondHand.onmouseup = mouseup;
    minuteHand.onmouseup = mouseup;
    hourHand.onmouseup = mouseup;
    lable.onmouseup = mouseup;
    document.onmouseup = mouseup;
}

function minute_mousemove(event) {
    // 计算当前鼠标相对元素的位置与元素中心点向上的夹角（角度制）
    let angle =
        (-Math.atan2(125 - event.offsetX, 125 - event.offsetY) * 180) / Math.PI;
    angle.toFixed(2);
    minuteHand.setAttribute("style", "rotate: " + angle + "deg");
    clock.minuteAngle = angle;
    if (angle < 0) clock.minuteAngle += 360;
    clock.update_time_via_angle();
    update_time_text();
    set_new_angle();
    outClock.onmouseup = mouseup;
    inClock.onmouseup = mouseup;
    liveClock.onmouseup = mouseup;
    secondHand.onmouseup = mouseup;
    minuteHand.onmouseup = mouseup;
    hourHand.onmouseup = mouseup;
    lable.onmouseup = mouseup;
    document.onmouseup = mouseup;
}

function hour_mousemove(event) {
    // 计算当前鼠标相对元素的位置与元素中心点向上的夹角（角度制）
    let angle =
        (-Math.atan2(125 - event.offsetX, 125 - event.offsetY) * 180) / Math.PI;
    angle.toFixed(2);
    hourHand.setAttribute("style", "rotate: " + angle + "deg");
    clock.hourAngle = angle;
    if (angle < 0) clock.hourAngle += 360;
    clock.update_time_via_angle();
    update_time_text();
    set_new_angle();
    outClock.onmouseup = mouseup;
    inClock.onmouseup = mouseup;
    liveClock.onmouseup = mouseup;
    secondHand.onmouseup = mouseup;
    minuteHand.onmouseup = mouseup;
    hourHand.onmouseup = mouseup;
    lable.onmouseup = mouseup;
    document.onmouseup = mouseup;
}

function set_new_angle() {
    secondHand.setAttribute("style", "rotate: " + clock.secondAngle + "deg");
    minuteHand.setAttribute("style", "rotate: " + clock.minuteAngle + "deg");
    hourHand.setAttribute("style", "rotate: " + clock.hourAngle + "deg");
    liveAngle = (Number(clock.secondAngle) + 180) % 360;
    liveClock.setAttribute("style", "rotate: " + liveAngle + "deg");
}

function update_time_text() {
    // 时间文本都转为两位显示
    hourText.innerHTML = clock.hour < 10 ? "0" + clock.hour : clock.hour;
    minuteText.innerHTML =
        clock.minute < 10 ? "0" + clock.minute : clock.minute;
    secondText.innerHTML =
        clock.second < 10 ? "0" + clock.second : clock.second;
}

function mouseup(event) {
    // 移除鼠标移动事件监听
    outClock.onmousemove = null;
    inClock.onmousemove = null;
    liveClock.onmousemove = null;
    lable.onmousemove = null;
    secondHand.onmousemove = null;
    minuteHand.onmousemove = null;
    hourHand.onmousemove = null;

    console.log(clock.second, clock.minute, clock.hour);
    clock.update_angle_via_time();
    set_new_angle();
    event.stopPropagation();
    outClock.onmouseup = null;
    inClock.onmouseup = null;
    liveClock.onmouseup = null;
    lable.onmouseup = null;
    document.onmouseup = null;
}

function change_state() {
    if (clock.state === "AM") {
        clock.state = "PM";
        lable.innerHTML = "PM";
        if (clock.hour < 12) clock.hour += 12;
        clock.hour %= 24;
    } else {
        clock.state = "AM";
        lable.innerHTML = "AM";
        if (clock.hour >= 12) clock.hour -= 12;
    }
    update_time_text();
}

function start() {
    if (clock_start === "pause" || clock_start === null)
        clock_start = setInterval(run_clock, 1000);
    setTimeout(start_animation, 300);
}

function pause() {
    clock.update_angle_via_time();
    set_new_angle();
    clearInterval(clock_start);
    clock_start = "pause";
    stop_animation();
}

function choseBtn(btn) {
    let i = 0;
    for (i = 0; i < btn_list.length; i++) {
        if (btn_list[i].id === btn.id) {
            btn_hover_list[i].style.opacity = 1;
            btn.style.boxShadow = "0 0 20px #0271cc";
            // btnChosen = btn;
        } else {
            btn_hover_list[i].style.opacity = 0;
            btn_list[i].style.boxShadow = "";
        }
    }
    switch (btn.id) {
        case "clockBtn":
            show_clock_items();
            break;
        case "secondBtn":
            // to do
            clear_clock_items();
            
            break;
        case "timerBtn":
            // to do
            clear_clock_items();
            break;
        case "alarmBtn":
            // to do
            clear_clock_items();
            break;
    }
}

function allowDrop() {
    secondHand.onmousedown = function () {
        // 控制台输出相对于元素左上角的坐标
        // 监听鼠标移动事件
        minuteHand.setAttribute(
            "style",
            "rotate: " + clock.minuteAngle + "deg"
        );
        hourHand.setAttribute("style", "rotate: " + clock.hourAngle + "deg");
        outClock.onmousemove = second_mousemove;
        inClock.onmousemove = second_mousemove;
        liveClock.onmousemove = second_mousemove;
        lable.onmousemove = second_mousemove;
    };
    minuteHand.onmousedown = function () {
        // 控制台输出相对于元素左上角的坐标
        // 监听鼠标移动事件
        hourHand.setAttribute("style", "rotate: " + clock.hourAngle + "deg");
        secondHand.setAttribute(
            "style",
            "rotate: " + clock.secondAngle + "deg"
        );
        liveClock.setAttribute(
            "style",
            "rotate: " + (clock.secondAngle + 180) + "deg"
        );
        outClock.onmousemove = minute_mousemove;
        inClock.onmousemove = minute_mousemove;
        liveClock.onmousemove = minute_mousemove;
        lable.onmousemove = minute_mousemove;
    };
    hourHand.onmousedown = function () {
        // 控制台输出相对于元素左上角的坐标
        // 监听鼠标移动事件
        secondHand.setAttribute(
            "style",
            "rotate: " + clock.secondAngle + "deg"
        );
        minuteHand.setAttribute(
            "style",
            "rotate: " + clock.minuteAngle + "deg"
        );
        liveClock.setAttribute(
            "style",
            "rotate: " + (clock.secondAngle + 180) + "deg"
        );
        outClock.onmousemove = hour_mousemove;
        inClock.onmousemove = hour_mousemove;
        liveClock.onmousemove = hour_mousemove;
        lable.onmousemove = hour_mousemove;
    };
    lable.onclick = change_state;
}

function disallowDrop() {
    secondHand.onmousedown = null;
    minuteHand.onmousedown = null;
    hourHand.onmousedown = null;
    lable.onclick = null;
}

function set_time_via_input() {
    let hour, minute, second;
    if (settingBtn.innerText === "设置时间") {
        settingBtn.innerText = "确认";
        clockInput.setAttribute("style", "display: block;");
        settingBtn.setAttribute("style", "margin-top: 5px;");
        pause();
        allowDrop();
    } else {
        hour = clockInput.value.split(":")[0];
        minute = clockInput.value.split(":")[1];
        second = clockInput.value.split(":")[2];
        settingBtn.innerText = "设置时间";
        clockInput.setAttribute("style", "display: none;");
        settingBtn.setAttribute("style", "margin-top: 35px;");
        // 检查输入合法性
        if (hour == undefined || minute == undefined || second == undefined) {
            start();
            return;
        }

        hour = parseInt(hour);
        minute = parseInt(minute);
        second = parseInt(second);
        clock.set_time(hour, minute, second);
        set_new_angle();
        update_time_text();
        disallowDrop();
        clockInput.value = "--:--:--";
        start();
    }
}

function clear_clock_items() {
    clockItems.setAttribute("style", "display: none;");
}

function show_clock_items() {
    clockItems.setAttribute("style", "display: block;");
}

function main() {
    choseBtn(clockBtn);
    // 初始化指针角度
    clock.update_angle_via_time();
    set_new_angle();
    update_time_text();

    start();
}

main();
