/* Search Modal */

import Modal from '@/components/Modal';

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Search" disableAutoFocus>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-on-surface-variant">
          Search content goes here. You can add a search input and results display.
        </p>
        {/* Add your search input and results display here */}
      </div>
    </Modal>
  );
}
