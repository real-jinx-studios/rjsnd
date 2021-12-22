import styles from "./input.module.css";


export default function CustomInput(props){

    return(
        <label className={`${styles.input_wrapper} ${styles.one}`}>
            <input className={styles.input} onChange={props.handleChange} type={props.type} defaultValue={props.defaultValue} value={props.value} required/>
            <span className={styles.placeholder}>{props.placeholder}</span>

        </label>

    )

}
