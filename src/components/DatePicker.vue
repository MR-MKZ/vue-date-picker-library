<script setup>
// const source = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
// ]
const days = [
    { id: 1, day: "شنبه" },
    { id: 2, day: "1شنبه" },
    { id: 3, day: "2شنبه" },
    { id: 4, day: "3شنبه" },
    { id: 5, day: "4شنبه" },
    { id: 5, day: "5شنبه" },
    { id: 5, day: "جمعه" },
]
</script>

<template>
    <!-- mobile date picker -->
    <!-- <div class="container">
        <div class="container__calender">
            <div class="container__calender__block">
                <span class="container__calender__block--text" v-for="value in source" :key="value.id">27</span>
            </div>
            <div class="container__calender__block">
                <span class="container__calender__block--text" v-for="value in source" :key="value.id">تیر</span>
            </div>
            <div class="container__calender__block">
                <span class="container__calender__block--text" v-for="value in source" :key="value.id">1404</span>
            </div>
        </div>
    </div> -->


    <div class="container">
        <header class="container__header">
            <p class="container__header--title">تاریخ را انتخاب نمایید</p>
        </header>
        <div class="container__content">
            <div class="container__content__filter">
                <p class="container__content__filter--item">شمسی</p>
                <p class="container__content__filter--item">فروردین</p>
                <p class="container__content__filter--item">1400</p>
            </div>
            <div class="container__content__weekdays">
                <span class="container__content__weekdays--day" v-for="item in days" :key="item.id">
                    {{ item.day }}
                </span>
            </div>
            <div class="container__content__days">
                <div class="container__content__days--day">۴</div>
            </div>
            <button class="container__content--button">تایید</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// .container {
//     border-radius: 60px;
//     height: 100%;
//     width: 100%;
//     max-height: 451px;
//     max-width: 600px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     box-shadow: -68px 62px 176px #0000001A;
//     background-color: $bg-white;
//     margin-inline: 10px;

//     &__calender {
//         width: 360px;
//         height: 207px;
//         display: flex;
//         justify-content: center;
//         margin: 0 auto;
//         gap: 68px;
//         padding-inline: 22px;

//         &__block {
//             width: 68px;
//             height: 207px;
//             display: flex;
//             flex-direction: column;
//             gap: 14px;

//             &--text {
//                 line-height: 32px;
//                 font-weight: $font-weight-semibold;
//                 color: $gray-400;
//                 text-align: center;
//             }

//             &--text:nth-child(3) {
//                 color: $primary-main;
//                 border-top: 1px solid $primary-main;
//                 border-bottom: 1px solid $primary-main;
//             }
//         }
//     }
// }

.container {
    background-color: $gray-100;
    width: 360px;
    height: 448px;
    padding: 24px 16px 16px 16px;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &__header {
        &--title {
            font-size: 12px;
            line-height: 16px;
            color: $text-light-base;
            text-align: center;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 20px;

        &__filter {
            display: flex;
            justify-content: space-between;
            height: 24px;

            &--item {
                font-size: 12px;
                line-height: 16px;
                color: $text-light-base;
            }
        }

        &__weekdays {
            height: 16px;
            display: flex;
            justify-content: space-between;
            background-color: $bg-light-default;
            border-radius: 4px;
            padding-inline: 2px;

            &--day {
                font-size: 12px;
                line-height: 16px;
                color: $text-light-base;
            }
        }

        &__days {
            display: grid;
            justify-content: space-between;
            grid-template-columns: repeat(7, 32px);
            grid-template-rows: repeat(5, 32px);
            gap: 16px;

            &--day {
                border-radius: 10px;
                font-size: 14px;
                color: $text-light-base;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        &--button {
            background-color: $primary-600;
            height: 48px;
            padding-inline: 16px;
            border-radius: 12px;
            cursor: pointer;
            color: white;
        }
    }
}
</style>
