import { useRef, useEffect } from 'react';
import ReactSelect, {
  GroupTypeBase,
  OptionTypeBase,
  Props as SelectProps,
  Styles,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

export default function Select({ name, ...rest }: Props) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const styles: Partial<
    Styles<OptionTypeBase, false, GroupTypeBase<OptionTypeBase>>
  > = {
    control: (provided, _state) => {
      return {
        ...provided,
        height: '100%',
        borderRadius: '10px',
        fontFamily: 'Fira Code',
        fontSize: '12px',
      };
    },
    option: (provided, _state) => {
      return {
        ...provided,
        color: '#666360',
      };
    },
    singleValue: (provided, _state) => {
      return {
        ...provided,
        color: '#666360',
      };
    },
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
      styles={styles}
    />
  );
}
