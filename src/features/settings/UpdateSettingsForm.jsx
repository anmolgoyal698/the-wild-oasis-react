import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./hooks/useSettings";
import { useUpdateSetting } from "./hooks/useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) {
    return <Spinner />;
  }

  const {
    minBookingsLength,
    maxBookingsLength,
    maxGuestsPerRoom,
    breakfastPrice,
  } = settings;

  const handleUpdateSetting = (e) => {
    const { id, defaultValue, value } = e.target;

    // If the value is empty, restore it to the defaultValue (previous value)
    if (!value.trim()) {
      e.target.value = defaultValue;
      return;
    }

    // If the value has not changed, don't trigger update operation
    if (defaultValue === Number(value)) {
      return;
    }
    updateSetting({ [id]: +value });
    e.target.defaultValue = +value;
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingsLength"
          defaultValue={minBookingsLength}
          disabled={isUpdating}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingsLength"
          defaultValue={maxBookingsLength}
          disabled={isUpdating}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerRoom"
          defaultValue={maxGuestsPerRoom}
          disabled={isUpdating}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
