export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
export const TOGGLE_IS_VIEW = 'TOGGLE_IS_VIEW'
export const TOGGLE_CONTENT_PANEL = 'TOGGLE_CONTENT_PANEL'

export const toggleDarkMode = (payload) => ({
    type: TOGGLE_DARK_MODE,
    isDark: payload
})

export const toggleIsView = (payload) => ({
    type: TOGGLE_IS_VIEW,
    isViewListPanel: payload
})

export const toggleContentPanel = (payload) => ({
    type: TOGGLE_CONTENT_PANEL,
    isViewContentPanel: payload
})