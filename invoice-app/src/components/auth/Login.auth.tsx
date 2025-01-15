import "./loginauth.styles.css";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../ui/button/button.tsx";
import { useLoginMutation } from "../../api/invoice.api.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useRedux.ts";
import { setCredentials } from "../../features/auth/auth.slice.ts";
import TextField from "../ui/text-field/TextField.tsx";
import { toast } from "sonner";
import Label from "../ui/label/Label.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";

type LoginFormValues = {
  email: string;
  password: string;
};
const LoginAuth = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
    // handle form submission
    const username = data.email;
    const password = data.password;

    if (!username.trim() || !password.trim()) return;

    try {
      const response = await login({ username, password }).unwrap();

      dispatch(
        setCredentials({
          ...response,
          user: username,
        }),
      );
      navigate("/invoices");
    } catch (error: any) {
      if (error?.originalStatus === 403) return toast.error(error?.data);
      if (error?.status === "FETCH_ERROR")
        return toast.error("check internet connection");
    }
  };

  return (
    <div className={"login-auth__form"}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <header>
            <Headline variant={"h2"}>Invoice Login</Headline>
          </header>
          <div className="form-group">
            <Label
              htmlFor={"email"}
              label={"Email Address"}
              error={errors?.email?.message}
              showError
            />
            <TextField
              type="email"
              className={`form-control ${errors?.email && "error"}`}
              id="email"
              name="email"
              disabled={isLoading}
              validationRules={{
                required: "can't be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "invalid email address",
                },
              }}
            />
          </div>
          <div className="form-group">
            <Label
              htmlFor={"password"}
              label={"Password"}
              error={errors?.password?.message}
              showError
            />
            <TextField
              type="password"
              className={`form-control ${errors?.password ? "error" : ""}`}
              id="password"
              disabled={isLoading}
              name={"password"}
              validationRules={{ required: "password required" }}
            />
          </div>
          <Button
            variant={"primary"}
            disabled={!isValid || !isDirty || isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginAuth;
