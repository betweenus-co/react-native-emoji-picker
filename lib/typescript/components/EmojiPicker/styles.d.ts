export declare const styles: {
    modalOverlay: {
        flex: number;
        justifyContent: "center";
        alignItems: "center";
    };
    modalContainer: {
        borderRadius: number;
        overflow: "hidden";
        shadowColor: string;
    } | {
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowOpacity: number;
        shadowRadius: number;
        elevation?: undefined;
        boxShadow?: undefined;
        borderRadius: number;
        overflow: "hidden";
        shadowColor: string;
    } | {
        elevation: number;
        shadowOffset?: undefined;
        shadowOpacity?: undefined;
        shadowRadius?: undefined;
        boxShadow?: undefined;
        borderRadius: number;
        overflow: "hidden";
        shadowColor: string;
    } | {
        boxShadow: string;
        shadowOffset?: undefined;
        shadowOpacity?: undefined;
        shadowRadius?: undefined;
        elevation?: undefined;
        borderRadius: number;
        overflow: "hidden";
        shadowColor: string;
    };
    contentContainer: {
        flex: number;
    };
    header: {
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        paddingHorizontal: number;
        paddingTop: number;
        paddingBottom: number;
        borderBottomWidth: number;
    };
    headerTitle: {
        fontSize: number;
        fontWeight: "bold";
    };
    closeButton: {
        padding: number;
    };
    scrollView: {
        flex: number;
    };
    categoryContainer: {
        marginVertical: number;
        paddingHorizontal: number;
    };
    categoryTitle: {
        fontSize: number;
        fontWeight: "600";
        marginTop: number;
        marginBottom: number;
        paddingHorizontal: number;
        paddingBottom: number;
        borderBottomWidth: number;
    };
    emojiGrid: {
        flexDirection: "row";
        flexWrap: "wrap";
        justifyContent: "space-evenly";
        alignItems: "center";
        paddingHorizontal: number;
    };
    searchEmojiGrid: {
        justifyContent: "flex-start";
        paddingLeft: number;
    };
    emojiButton: {
        justifyContent: "center";
        alignItems: "center";
        padding: number;
    };
    emojiText: {
        fontSize: number;
    };
    noResultsContainer: {
        padding: number;
        justifyContent: "center";
        alignItems: "center";
    };
    noResultsText: {
        fontSize: number;
        fontWeight: "500";
        textAlign: "center";
    };
    skinToneSelector: {
        flexDirection: "row";
        gap: number;
        paddingHorizontal: number;
        paddingVertical: number;
        justifyContent: "center";
    };
    skinToneButton: {
        width: number;
        height: number;
        borderRadius: number;
        borderWidth: number;
    };
    skinToneButtonActive: {
        borderWidth: number;
        transform: {
            scale: number;
        }[];
    };
};
//# sourceMappingURL=styles.d.ts.map