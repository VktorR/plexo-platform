import { Button, Center, Stack, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

import PlexoLogo from "components/resources/PlexoLogo";

const LoginPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Center style={{ height: "100vh" }}>
      <Stack align={"center"}>
        <PlexoLogo typographyColor={colorScheme === "light" ? theme.colors.gray[9] : undefined} />
        <Button
          component="a"
          href={process.env.NEXT_PUBLIC_URL_AUTH || "/auth/github"}
          leftIcon={<BrandGithub />}
        >
          Login with Github
        </Button>
      </Stack>
    </Center>
  );
};

export default LoginPage;
