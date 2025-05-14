import { BUTTON, EVENTS } from './utils/consts';

export function navigate(href) {
    window.history.pushState({}, '', href);
    //Crear un evento personalizado para avisar de que hemos cambiando la url
    const navigationEvent = new Event(EVENTS.PUSH_STATE);
    window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
    const handleClick = (event) => {

        const isMainEvent = event.button === BUTTON.PRIMARY; // primary click
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
        const isManageableEvent = target === undefined || target === '_self';

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            event.preventDefault();
            navigate(to);
            window.scrollTo(0, 0);
        }

    }

    return <a onClick={handleClick} href={to} target={target} {...props} />
}
