import { subscribe } from "on-screen-keyboard-detector";

export default (context, inject) => {
    inject("detect_keyboard", subscribe);
};
