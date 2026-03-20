const observers = new Map<string, IntersectionObserver>()
const callbacks = new Map<Element, (entry: IntersectionObserverEntry) => void>()

export function observe(
  element: Element,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) {
  const key = JSON.stringify({
    threshold: options?.threshold ?? 0,
    rootMargin: options?.rootMargin ?? '0px',
  })

  if (!observers.has(key)) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cb = callbacks.get(entry.target)
        if (cb) cb(entry)
      })
    }, options)
    observers.set(key, obs)
  }

  callbacks.set(element, callback)
  observers.get(key)!.observe(element)

  return () => {
    callbacks.delete(element)
    observers.get(key)?.unobserve(element)
  }
}
