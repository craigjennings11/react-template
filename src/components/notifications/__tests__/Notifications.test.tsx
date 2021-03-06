import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@test/jestUtils';
import { useNotificationActionsContext } from '@contexts/NotificationContext';
import Notifications from '../Notifications';
import StandardNotification from '../StandardNotification';

describe('Notifications', () => {
  let addNotification: (c: JSX.Element) => void;

  const Wrapper = () => {
    ({ addNotification } = useNotificationActionsContext());

    return <Notifications />;
  };

  it('shows a notification', () => {
    render(<Wrapper />);

    act(() => addNotification(<StandardNotification>Howdy</StandardNotification>));

    expect(screen.getByText('Howdy')).toBeDefined();
  });

  it('shows two notifications', () => {
    render(<Wrapper />);

    act(() => {
      addNotification(<StandardNotification>Howdy</StandardNotification>);
      addNotification(<StandardNotification>Howdy 2</StandardNotification>);
    });

    expect(screen.getByText('Howdy')).toBeDefined();
    expect(screen.getByText('Howdy 2')).toBeDefined();
  });

  it('should not show more than three notifications', async () => {
    render(<Wrapper />);

    act(() => {
      addNotification(<StandardNotification>Howdy 1</StandardNotification>);
      addNotification(<StandardNotification>Howdy 2</StandardNotification>);
      addNotification(<StandardNotification>Howdy 3</StandardNotification>);
      addNotification(<StandardNotification>Howdy 4</StandardNotification>);
    });

    expect(screen.queryByText('Howdy 1')).toBeNull();
    expect(screen.getByText('Howdy 2')).toBeDefined();
    expect(screen.getByText('Howdy 3')).toBeDefined();
    expect(screen.getByText('Howdy 4')).toBeDefined();
  });

  it('should dismiss a notification when it is clicked', async () => {
    render(<Wrapper />);

    act(() => addNotification(<StandardNotification>Howdy</StandardNotification>));

    const notification = screen.getByText('Howdy');

    fireEvent.click(notification);

    await waitForElementToBeRemoved(() => screen.getByText('Howdy'));

    expect(screen.queryByTestId('notification')).toBeNull();
  });
});
