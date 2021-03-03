import { Box, Button, Center} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { Wrapper } from "../components/Wrapper";
import { __containerHeight__ } from "../constants";
import { useRegisterMutation } from "../graphql/generated";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, register] = useRegisterMutation();

  return (
    <>
      <NavBar></NavBar>
      <Container height={__containerHeight__}>
        <Wrapper variant="small">
          <Formik
            initialValues={{
              email: "",
              password: "",
              verifyPassword: "",
              firstname: "",
              lastname: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              setIsSubmitting(true);
              if (values.password !== values.verifyPassword) {
                setErrors(
                  toErrorMap([
                    {
                      field: "password",
                      message: "passwords are not the same",
                    },
                  ])
                );
                setIsSubmitting(false);
              } else {
                const response = await register({
                  email: values.email,
                  password: values.password,
                  firstname: values.firstname,
                  lastname: values.lastname,
                });
                if (response.data?.register.errors?.length !== 0) {
                  if (response.data?.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors)); // Formik hook to handle each field errors + utility function to map the errors from GraphQL
                    setIsSubmitting(false);
                  }
                } else if (response.data?.register.user) {
                  //worked
                  router.push("/");
                }
              }
            }}
          >
            <Form>
              <Box mt={12}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email *"
                  required
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="firstname"
                  placeholder="firstname"
                  label="Firstname *"
                  required
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="lastname"
                  placeholder="lastname"
                  label="Lastname *"
                  required
                />
              </Box>
              <Box mt={8}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password *"
                  type="password"
                  required
                  showButton
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="verifyPassword"
                  placeholder="password"
                  label="Verify password *"
                  type="password"
                  required
                  showButton
                />
              </Box>
              <Center>
                <Button
                  m={12}
                  size="lg"
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  register
                </Button>
              </Center>
            </Form>
          </Formik>
        </Wrapper>
      </Container>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Register);
