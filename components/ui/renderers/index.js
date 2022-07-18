import dayjs from "dayjs";
import NumberFormat from "react-number-format";

export function Date({ value, format = 'DD/MM/YYYY' }) {
    return dayjs(value).format(format);
}

export function Float({ value, ...rest }) {
    return (<NumberFormat
        displayType={'text'}
        value={value}
        decimalSeparator=","
        thousandSeparator="."
        fixedDecimalScale={true}
        decimalScale={2}
        {...rest}
    />)
}

export function Money({ value, ...rest }) {
    return (
      <NumberFormat
        displayType={'text'}
        value={value}
        decimalSeparator=","
        thousandSeparator="."
        fixedDecimalScale={true}
        decimalScale={2}
        prefix="R$"
        {...rest}
      />)
  }

  export function ID({ value }) {
      return (<>#{value}</>);
  }