import { useState, useCallback } from 'react'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { CustomAvatar } from '@/shared/ui'

export const useMessageCard = (messageId: string, avatar?: string) => {
    const [clicked, setClicked] = useState(false)
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
    const [messageHovered, setMessageHovered] = useState(false)
    const [snackBarAppearance, setSnackBarAppearance] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<React.ReactNode>(null)

    const userId = useAppSelector((state) => state.authState.userData?._id)

    const handleOpenModal = useCallback(() => {
        setModalContent(
            <CustomAvatar
                src={avatar}
                sx={{
                    width: 384,
                    height: 384,
                    maxWidth: '100%',
                }}
            />
        )
        setIsModalOpen(true)
    }, [avatar])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        setModalContent(null)
    }, [])

    const handleLike = useCallback(() => {
        // ... ваша логіка для лайків
    }, [messageId])

    const handlers = {
        onContextMenu: (e: React.MouseEvent) => {
            e.preventDefault()
            setClicked(true)
            setCoordinates({ x: e.pageX, y: e.pageY })
        },
        onMouseEnter: () => setMessageHovered(true),
        onMouseLeave: () => setMessageHovered(false),
    }

    return {
        clicked,
        coordinates,
        handleCloseModal,
        handlers,
        handleLike,
        handleOpenModal,
        setSnackBarAppearance,
        snackBarAppearance,
        userId,
        messageHovered,
        isModalOpen,
        modalContent,
    }
} 