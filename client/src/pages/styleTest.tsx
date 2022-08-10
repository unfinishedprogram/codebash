import style from "./styleTest.module.scss";
const StyleTest = () => {
    return (
    <div class={style.container}>
        <div class={style.layers}>
            <div><div><div><div><div><div>
            </div></div></div></div></div></div>
        </div>
        <div>
            <h1>H1</h1>
            <h2>H2</h2>
            <h3>H3</h3>
            <h4>H4</h4>
            <h5>H5</h5>
            <h6>H6</h6>
        </div>
        <div class={style.buttons_container}>
            <button class={style.button}>Generic</button>
            <button class={style.button_confirm}>Confirm</button>
            <button class={style.button_cancel}>Cancel</button>
            <button class={style.button_warn}>Warn</button>
        </div>
    </div>)
};

export default StyleTest;