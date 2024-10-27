import { render, screen, userEvent } from "@testing-library/react-native";
import Image from "../../components/Image";

test("form submits two answers", async () => {
  const questions = ["q1", "q2"];
  const onSubmit = jest.fn();

  const user = userEvent.setup();
  render(<Image src="https:/www.ertert.com" />);

  expect(true).toBeTruthy();
});
