import { useRef, useEffect } from "react";

enum Direction {
  Up,
  Down,
  None,
}

interface ScrollState {
  currentIndex: number;
  currentOffset: number;
  targetOffset: number;
  timeoutID: number;
  direction: Direction;
  directionStart: number;
  animation: any | null;
}

interface UseScrollSnapProps {
  ref: React.RefObject<HTMLElement>;
  duration?: number;
  isArrowKeysEnabled?: boolean;
  isDirectionEnabled?: boolean;
}

interface UseScrollSnapReturn {
  state: React.RefObject<ScrollState>;
  goto: (index: number) => void;
}

const INTERACTION_TIMEOUT = 150;

function useScrollSnap({
  ref: elementRef,
  duration = 100,
  isArrowKeysEnabled = true,
  isDirectionEnabled = true,
}: UseScrollSnapProps): UseScrollSnapReturn {
  const dataRef = useRef<ScrollState>({
    currentIndex: 0,
    currentOffset: 0,
    targetOffset: 0,
    timeoutID: 0,
    direction: Direction.None,
    directionStart: 0,
    animation: null,
  });

  const getTargetScrollOffset = (element: HTMLElement) => {
    let top = element.offsetTop;
    while (element.offsetParent) {
      element = element.offsetParent as HTMLElement;
      top += element.offsetTop;
    }
    return top;
  };

  const getChildElements = () => {
    if (elementRef.current && elementRef.current.children.length > 0) {
      return Array.from(elementRef.current.children) as Array<HTMLElement>;
    } else {
      return [];
    }
  };

  // Modified from https://stackoverflow.com/a/125106
  const getElementsInView = () => {
    return getChildElements().filter((element) => {
      const height = element.offsetHeight;
      let top = element.offsetTop;
      while (element.offsetParent) {
        element = element.offsetParent as HTMLElement;
        top += element.offsetTop;
      }
      return (
        top < window.scrollY + window.innerHeight &&
        top + height > window.scrollY
      );
    });
  };

  const getElementViewportHeight = (element: HTMLElement) => {
    const viewportHeight = window.innerHeight;

    const rect = element.getBoundingClientRect();

    let elementY;
    if (rect.top < 0) {
      elementY = rect.bottom;
    } else if (rect.bottom > viewportHeight) {
      elementY = viewportHeight - rect.top;
    } else {
      elementY = rect.bottom - rect.top;
    }

    return elementY;
  };

  const findSnapTarget = () => {
    const elementsInView = getElementsInView();
    if (elementsInView.length < 1) return;

    dataRef.current.currentOffset = window.scrollY;

    if (isDirectionEnabled) {
      if (dataRef.current.direction === Direction.Up) {
        snapToTarget(elementsInView[0]);
        return;
      } else if (dataRef.current.direction === Direction.Down) {
        snapToTarget(elementsInView[elementsInView.length - 1]);
        return;
      }
    }

    let largestElement;
    let largestHeight = -1;

    for (const element of elementsInView) {
      const elementHeight = getElementViewportHeight(element);
      if (elementHeight > largestHeight) {
        largestElement = element;
        largestHeight = elementHeight;
      }
    }

    if (largestElement) {
      snapToTarget(largestElement);
    }
  };

  const snapToTarget = (target: HTMLElement) => {
    if (dataRef.current.animation) {
      dataRef.current.animation.stop();
    }

    const elements = getChildElements();
    for (let i = 0; i < elements.length; ++i) {
      const element = elements[i];
      if (element.isSameNode(target)) {
        dataRef.current.currentIndex = i;
      }
    }

    dataRef.current.targetOffset = getTargetScrollOffset(target);

    // const animation = new Tweezer({
    //     start: 0,
    //     end: 10000,
    //     duration: duration,
    // })

    // animation.on('tick', tickAnimation)
    // animation.on('done', clearAnimation)

    // dataRef.current.animation = animation
    // animation.begin()
  };

  const tickAnimation = (value: number) => {
    const scrollTopDelta =
      dataRef.current.targetOffset - dataRef.current.currentOffset;
    const scrollTop =
      dataRef.current.currentOffset + (scrollTopDelta * value) / 10000;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  const clearAnimation = () => {
    clearTimeout(dataRef.current.timeoutID);

    if (dataRef.current.animation) {
      dataRef.current.animation.stop();
    }

    dataRef.current = {
      currentIndex: dataRef.current.currentIndex,
      currentOffset: 0,
      targetOffset: 0,
      timeoutID: 0,
      direction: Direction.None,
      directionStart: 0,
      animation: null,
    };
  };

  const handleInteraction = () => {
    dataRef.current.timeoutID = setTimeout(findSnapTarget, INTERACTION_TIMEOUT);
  };

  const handleWheel = (event: WheelEvent) => {
    clearAnimation();

    if (event.deltaY < 0) {
      dataRef.current.direction = Direction.Up;
    } else if (event.deltaY > 0) {
      dataRef.current.direction = Direction.Down;
    } else {
      dataRef.current.direction = Direction.None;
    }

    handleInteraction();
  };

  const handleTouchStart = (event: TouchEvent) => {
    dataRef.current.directionStart = event.touches[0].clientY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    const deltaY = event.touches[0].clientY - dataRef.current.directionStart;

    if (deltaY > 0) {
      dataRef.current.direction = Direction.Up;
    } else {
      dataRef.current.direction = Direction.Down;
    }

    handleInteraction();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const currentIndex = dataRef.current.currentIndex;

    if (event.code === "ArrowUp" && currentIndex > 0) {
      event.preventDefault();

      const elements = getChildElements();
      const element = elements[currentIndex - 1];

      clearAnimation();
      snapToTarget(element);
    } else if (event.code === "ArrowDown") {
      const elements = getChildElements();

      if (currentIndex < elements.length - 1) {
        event.preventDefault();

        const element = elements[currentIndex + 1];

        clearAnimation();
        snapToTarget(element);
      }
    }
  };

  const goto = (index: number) => {
    const elements = getChildElements();
    const element = elements[index];

    if (element) {
      clearAnimation();
      snapToTarget(element);
    }
  };

  useEffect(() => {
    clearAnimation();

    document.addEventListener("wheel", handleWheel, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (isArrowKeysEnabled) {
      document.addEventListener("keydown", handleKeyDown);
    }

    findSnapTarget();

    return () => {
      clearAnimation();

      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);

      if (isArrowKeysEnabled) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  return {
    state: dataRef,
    goto,
  };
}

export default useScrollSnap;
