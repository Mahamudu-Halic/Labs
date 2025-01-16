import { useFormContext } from "react-hook-form";
import "./formaddress.styles.css";
import { Errors } from "../../../types/form.types.ts";
import TextField from "../../ui/text-field/TextField.tsx";
import Label from "../../ui/label/Label.tsx";

interface FormAddressProps {
  field: string;
}

const FormAddress = ({ field }: FormAddressProps) => {
  const {
    formState: { errors },
  } = useFormContext();
  const { street, postCode, city, country } = (errors[field] as Errors) ?? {};

  return (
    <div className={"form-address"}>
      <div>
        <Label
          htmlFor={field + "streetAddress"}
          label={"Street Address"}
          error={street?.message}
          showError
        />
        <TextField
          className={street ? "error" : ""}
          id={field + "streetAddress"}
          name={`${field}.street`}
          validationRules={{
            required: "can't be empty",
          }}
        />
      </div>
      <div className={"form-address__info"}>
        <div className={"form-address__info-left"}>
          <div>
            <Label
              htmlFor={field + "state"}
              error={city?.message}
              label={"City"}
            />
            <TextField
              className={city ? "error" : ""}
              id={field + "city"}
              name={`${field}.city`}
              validationRules={{
                required: "can't be empty",
              }}
            />
          </div>
          <div>
            <Label
              htmlFor={field + "postalCode"}
              label={"Postal Code"}
              error={postCode?.message}
            />
            <TextField
              className={postCode ? "error" : ""}
              id={field + "postalCode"}
              name={`${field}.postCode`}
              validationRules={{
                required: "can't be empty",
              }}
            />
          </div>
        </div>
        <div className={"form-address__info-country"}>
          <Label
            htmlFor={field + "country"}
            label={"Country"}
            error={country?.message}
          />
          <TextField
            className={country ? "error" : ""}
            id={field + "country"}
            name={`${field}.country`}
            validationRules={{
              required: "can't be empty",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormAddress;
