import { Dialog } from "@headlessui/react";

function ArticleModal({ isOpen, setIsOpen }) {
  function handleDeactivate() {
    // ...
  }

  return (
    /*
      Pass `isOpen` to the `open` prop, and use `onClose` to set
      the state back to `false` when the user clicks outside of
      the dialog or presses the escape key.
    */
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="w-screen h-screen fixed z-50 transition-all"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 grid place-items-center p-4">
        <Dialog.Panel className="bg-white max-w-screen-sm">
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          {/*
          You can render additional buttons to dismiss your dialog by setting
          `isOpen` to `false`.
        */}
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleDeactivate}>Deactivate</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ArticleModal;
