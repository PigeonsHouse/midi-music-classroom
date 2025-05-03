type AddDevice = (dev: MIDIInput) => void;

export const initMidiDevice = async (addDevice: AddDevice) => {
  try {
    const access = await navigator.requestMIDIAccess();
    const inputIterator = access.inputs.values();
    for (
      let input = inputIterator.next();
      !input.done;
      input = inputIterator.next()
    ) {
      const value = input.value;
      addDevice(value);
    }
  } catch {
    // MIDIのリクエストを禁止したらこっちに流れる
    return;
  }
};
