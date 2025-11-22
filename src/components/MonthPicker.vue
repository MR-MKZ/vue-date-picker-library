<script setup>
import CloseIcon from "@/components/icons/close-icon.vue";
// import chevronIcon from "@/components/icons/chevron-icon.vue";
import ArrowIcon from "./icons/arrow-icon.vue";

</script>

<template>
    <div class="container">
        <header class="container__header">
            <close-icon class="container__header--close" />
            <p class="container__header--title">تاریخ را انتخاب نمایید</p>
        </header>
        <div class="container__content">
            <!-- <div class="container__content__filter">
                <div class="container__content__filter--item">
                    <span>شمسی</span>
                    <chevron-icon />
                </div>
                <div class="container__content__filter--item">
                    <span>فروردین</span>
                    <chevron-icon />
                </div>
                <div class="container__content__filter--item">
                    <span>۱۴۰۰</span>
                    <chevron-icon />
                </div>
            </div> -->
            <div class="container__content__filter">
                <div class="container__content__filter--item" style="rotate: 180deg;">
                    <arrow-icon />
                </div>
                <div class="container__content__filter--item">
                    <span>1400</span>
                </div>
                <div class="container__content__filter--item">
                    <arrow-icon />
                </div>
            </div>
            <div class="container__content__months">
                <div class="container__content__months--month">تیر</div>

                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>
                <div class="container__content__months--month">تیر</div>


            </div>
            <button class="container__content--button">تایید</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        max-height: 24px;
        margin-bottom: 12px;

        &--title {
            font-size: 12px;
            line-height: 16px;
            color: $text-light-base;
            text-align: center;
        }

        &--close {
            cursor: pointer;
            width: 24px;
            height: 24px;
            position: absolute;
            right: 0;
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
                display: flex;
                gap: 4px;
                align-items: center;
                color: $text-light-base;
            }
        }


        &__months {
            display: grid;
            justify-content: space-between;
            direction: ltr;
            grid-template-columns: repeat(3, 90px);
            grid-template-rows: repeat(4, 55px);
            gap: 12px;
            flex: 1;
            overflow-y: auto;
            max-height: 256px;
            // padding-right: 12px;

            &::-webkit-scrollbar {
                width: 4px;
            }

            &::-webkit-scrollbar-track {
                border-radius: 10px;
                background-color: $primary-200;
                border-left: 1px solid white;
                border-right: 1px solid white;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: $primary-400;
            }

            &--month {
                border: 1px solid $gray-200;
                border-radius: 10px;
                height: 55px;
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 20px;
                font-size: 12px;
                color: $text-light-base2;
                cursor: pointer;
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