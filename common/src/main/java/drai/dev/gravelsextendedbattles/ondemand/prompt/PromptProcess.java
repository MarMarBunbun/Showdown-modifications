package drai.dev.gravelsextendedbattles.ondemand.prompt;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JProgressBar;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.WindowConstants;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.PopupMenuEvent;
import javax.swing.event.PopupMenuListener;
import javax.swing.plaf.basic.BasicHTML;
import javax.swing.text.View;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Desktop;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.BufferedReader;
import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;

/**
 * The window that asks for the Pokemon selection and shows the download. It runs in a <b>separate JVM</b> that the mod starts
 * ({@code ProcessSelectionPrompt}), because inside the game's JVM AWT is unusable: Minecraft sets {@code java.awt.headless=true} and Java
 * caches the answer the first time anything asks, so setting the property back is too late (seen in the game, not only guessed).
 *
 * <p>This file is plain Java on the JDK only, with no mod classes and no Kotlin: the mod copies its class file to a temporary folder and
 * runs it from there. Commands arrive on stdin, one per line, fields separated by a tab with {@code \\}, {@code \t} and {@code \n} escaped:
 * <pre>
 * ASK initial reason warning   show the code field        PROGRESS text fraction|-   the download bar
 * ERR reason                   the code was refused       FINISH message|(empty)     done; a message waits for OK
 * OK                           the code was accepted      QUIT                       close
 * </pre>
 * and the window answers on stdout: {@code READY}, {@code CODE text}, {@code ALL} (include everything, no selection), {@code CLOSED}
 * (closed while a code was wanted), {@code DISMISSED}. When stdin ends (the game died) the window closes. Setting {@code GEB_PROMPT_AUTOCODE}
 * makes it answer an {@code ASK} with that code by itself ({@code ALL} presses Include everything), which is how the tests drive it.
 *
 * <p>The window takes the focus only when it asks for the code; the progress after that shows without pulling the focus away from
 * whatever the player is typing in.
 */
public final class PromptProcess {
    private static final Color BACKGROUND = new Color(0x31, 0x31, 0x31);
    private static final Color TEXT = new Color(0xe0, 0xe0, 0xe0);
    private static final Color WARNING = new Color(0xff, 0xaa, 0x00);
    private static final Color ERROR = new Color(0xff, 0x55, 0x55);
    private static final Color GREEN = new Color(0x4a, 0x7c, 0x2a);
    private static final Color GREY = new Color(0x6f, 0x6f, 0x6f);
    private static final String SELECTOR_URL = "https://submit.gravelmon.com/pokemon-selector";
    /** The width the text wraps at, in pixels. Swing's HTML reads a CSS {@code px} as 1.3 pixels, so the wrapping is measured, not styled. */
    private static final int CONTENT_WIDTH = 520;

    private static PrintStream out;
    private static final JFrame frame = new JFrame("Gravelmon Pokémon");
    private static final JLabel warning = new JLabel();
    private static final JLabel reason = new JLabel();
    private static final JTextField input = new JTextField();
    private static final JPanel inputPanel = new JPanel(new BorderLayout(8, 8));
    private static final JButton openSite = new JButton("Open selector site");
    private static final JButton everything = new JButton("Include everything");
    private static final JButton proceed = new JButton("Continue");
    private static final JLabel status = new JLabel(" ");
    private static final JProgressBar bar = new JProgressBar(0, 1000);
    private static final JButton dismiss = new JButton("OK");
    private static volatile boolean asking;

    private PromptProcess() {
    }

    public static void main(String[] args) throws Exception {
        System.setProperty("java.awt.headless", "false");
        out = new PrintStream(new FileOutputStream(FileDescriptor.out), true, "UTF-8");
        SwingUtilities.invokeAndWait(PromptProcess::build);
        send("READY");
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
        String line;
        while ((line = in.readLine()) != null) {
            String[] parts = line.split("\t", -1);
            for (int i = 1; i < parts.length; i++) {
                parts[i] = unescape(parts[i]);
            }
            String[] fields = parts;
            SwingUtilities.invokeLater(() -> handle(fields));
        }
        System.exit(0);
    }

    public static String escape(String text) {
        return text.replace("\\", "\\\\").replace("\t", "\\t").replace("\n", "\\n").replace("\r", "");
    }

    public static String unescape(String text) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (c == '\\' && i + 1 < text.length()) {
                char next = text.charAt(++i);
                result.append(next == 't' ? '\t' : next == 'n' ? '\n' : next);
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }

    private static void send(String line) {
        out.println(line);
        out.flush();
    }

    /**
     * Sets {@code text} on {@code label}, wrapped at {@link #CONTENT_WIDTH}: the label's HTML view is laid out at that width and the label
     * is given the height that takes. The label's font must be set first. An empty text takes no space.
     */
    private static void setWrapped(JLabel label, String text) {
        if (text.isEmpty()) {
            label.setText("");
            label.setPreferredSize(null);
            return;
        }
        label.setText("<html>" + text.replace("&", "&amp;").replace("<", "&lt;") + "</html>");
        View view = (View) label.getClientProperty(BasicHTML.propertyKey);
        if (view == null) {
            label.setPreferredSize(null);
            return;
        }
        view.setSize(CONTENT_WIDTH, 0);
        label.setPreferredSize(new Dimension(CONTENT_WIDTH, (int) Math.ceil(view.getPreferredSpan(View.Y_AXIS))));
    }

    /** Shows the window if it is hidden. {@code setVisible(true)} on a window that is already showing brings it to the front, so it is not repeated. */
    private static void show() {
        if (!frame.isVisible()) {
            frame.setVisible(true);
        }
    }

    private static void setChoosing(boolean enabled) {
        proceed.setEnabled(enabled && !input.getText().trim().isEmpty());
        everything.setEnabled(enabled);
    }

    private static String field(String[] parts, int index) {
        return index < parts.length ? parts[index] : "";
    }

    private static void handle(String[] parts) {
        switch (parts[0]) {
            case "ASK" -> {
                setWrapped(warning, field(parts, 3));
                String why = field(parts, 2);
                setWrapped(reason, why.isEmpty() ? "" : "The code in your config is not valid: " + why);
                input.setText(field(parts, 1));
                asking = true;
                inputPanel.setVisible(true);
                status.setText(" ");
                setChoosing(true);
                frame.pack();
                // The player has to act now, so this is the one time the window takes the focus.
                frame.setAutoRequestFocus(true);
                if (frame.isVisible()) {
                    frame.toFront();
                } else {
                    frame.setVisible(true);
                }
                input.requestFocusInWindow();
                autoAnswer();
            }
            case "ERR" -> {
                setWrapped(reason, field(parts, 1));
                status.setText(" ");
                setChoosing(true);
                frame.pack();
                autoAnswer();
            }
            case "OK" -> {
                asking = false;
                inputPanel.setVisible(false);
                frame.setAutoRequestFocus(false);
                frame.pack();
            }
            case "PROGRESS" -> {
                show();
                status.setPreferredSize(null);
                status.setText(field(parts, 1));
                String fraction = field(parts, 2);
                if (fraction.equals("-") || fraction.isEmpty()) {
                    bar.setIndeterminate(true);
                } else {
                    bar.setIndeterminate(false);
                    bar.setValue((int) Math.max(0, Math.min(1000, Double.parseDouble(fraction) * 1000)));
                }
            }
            case "FINISH" -> {
                String message = field(parts, 1);
                if (message.isEmpty()) {
                    System.exit(0);
                }
                setWrapped(status, message);
                bar.setVisible(false);
                dismiss.setVisible(true);
                frame.pack();
                show();
            }
            case "QUIT" -> System.exit(0);
            default -> {
            }
        }
    }

    private static void autoAnswer() {
        String code = System.getenv("GEB_PROMPT_AUTOCODE");
        if ("ALL".equals(code)) {
            send("ALL");
        } else if (code != null) {
            send("CODE\t" + escape(code));
        }
    }

    private static void submit() {
        String text = input.getText().trim();
        if (text.isEmpty()) {
            return;
        }
        setChoosing(false);
        status.setText("Checking the code…");
        send("CODE\t" + escape(text));
    }

    private static void includeEverything() {
        setChoosing(false);
        status.setText("Including every Pokémon…");
        send("ALL");
    }

    private static JMenuItem menuItem(String text, ActionListener action) {
        JMenuItem item = new JMenuItem(text);
        item.addActionListener(action);
        return item;
    }

    /** The right-click menu of the code field: a plain text field has none, and not everyone thinks of Ctrl+V. */
    private static JPopupMenu editMenu() {
        JPopupMenu menu = new JPopupMenu();
        JMenuItem cut = menuItem("Cut", e -> input.cut());
        JMenuItem copy = menuItem("Copy", e -> input.copy());
        menu.add(cut);
        menu.add(copy);
        menu.add(menuItem("Paste", e -> input.paste()));
        menu.addSeparator();
        menu.add(menuItem("Select all", e -> input.selectAll()));
        menu.addPopupMenuListener(new PopupMenuListener() {
            @Override
            public void popupMenuWillBecomeVisible(PopupMenuEvent e) {
                boolean selected = input.getSelectionStart() != input.getSelectionEnd();
                cut.setEnabled(selected);
                copy.setEnabled(selected);
                input.requestFocusInWindow();
            }

            @Override
            public void popupMenuWillBecomeInvisible(PopupMenuEvent e) {
            }

            @Override
            public void popupMenuCanceled(PopupMenuEvent e) {
            }
        });
        return menu;
    }

    private static void style(JComponent component, Color color) {
        component.setForeground(color);
        component.setFont(new Font(Font.DIALOG, Font.PLAIN, 14));
    }

    private static void styleButton(JButton button, boolean primary) {
        button.setFont(new Font(Font.DIALOG, Font.BOLD, 14));
        button.setFocusPainted(false);
        button.setBackground(primary ? GREEN : GREY);
        button.setForeground(Color.WHITE);
        button.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(Color.BLACK, 2), BorderFactory.createEmptyBorder(6, 16, 6, 16)));
        button.setOpaque(true);
    }

    private static void build() {
        JPanel content = new JPanel();
        content.setLayout(new BoxLayout(content, BoxLayout.Y_AXIS));
        content.setBackground(BACKGROUND);
        content.setBorder(BorderFactory.createEmptyBorder(18, 22, 18, 22));

        JLabel title = new JLabel("Choose your Pokémon");
        title.setFont(new Font(Font.DIALOG, Font.BOLD, 20));
        title.setForeground(Color.WHITE);
        JLabel message = new JLabel();
        style(message, TEXT);
        setWrapped(message, "Gravelmon only installs Pokémon you've chosen to use. Create your selection on the site and paste the code in the "
            + "text box below to continue, or press Include everything to skip choosing and get every Pokémon.");
        style(warning, WARNING);
        style(reason, ERROR);
        style(status, TEXT);

        input.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 14));
        input.setBackground(new Color(0x10, 0x10, 0x10));
        input.setForeground(Color.WHITE);
        input.setCaretColor(Color.WHITE);
        input.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(0xa0, 0xa0, 0xa0), 1), BorderFactory.createEmptyBorder(6, 8, 6, 8)));
        // A code can be thousands of characters long: the field keeps the text's width and scrolls instead of growing.
        input.setPreferredSize(new Dimension(CONTENT_WIDTH, input.getPreferredSize().height));
        input.setComponentPopupMenu(editMenu());
        styleButton(openSite, false);
        styleButton(everything, false);
        styleButton(proceed, true);
        styleButton(dismiss, true);
        proceed.setEnabled(false);

        JPanel buttons = new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 0));
        buttons.setOpaque(false);
        buttons.add(openSite);
        buttons.add(everything);
        buttons.add(proceed);
        inputPanel.setOpaque(false);
        inputPanel.add(input, BorderLayout.NORTH);
        inputPanel.add(reason, BorderLayout.CENTER);
        inputPanel.add(buttons, BorderLayout.SOUTH);
        inputPanel.setVisible(false);

        bar.setBackground(new Color(0x10, 0x10, 0x10));
        bar.setForeground(GREEN);
        bar.setBorder(BorderFactory.createLineBorder(Color.BLACK, 2));
        bar.setMaximumSize(new Dimension(Integer.MAX_VALUE, 16));
        dismiss.setVisible(false);

        for (JComponent component : new JComponent[] {title, message, warning, inputPanel, status, bar, dismiss}) {
            component.setAlignmentX(0f);
            content.add(component);
            content.add(Box.createVerticalStrut(10));
        }
        frame.setContentPane(content);
        frame.setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent event) {
                // Closing while a code is wanted stops the game; closing during the download is ignored.
                if (asking) {
                    send("CLOSED");
                    System.exit(0);
                }
            }
        });
        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setAlwaysOnTop(true);
        frame.setAutoRequestFocus(false);

        input.getDocument().addDocumentListener(new DocumentListener() {
            private void changed() {
                if (asking) {
                    proceed.setEnabled(!input.getText().trim().isEmpty());
                }
            }

            @Override
            public void insertUpdate(DocumentEvent e) {
                changed();
            }

            @Override
            public void removeUpdate(DocumentEvent e) {
                changed();
            }

            @Override
            public void changedUpdate(DocumentEvent e) {
                changed();
            }
        });
        proceed.addActionListener(e -> submit());
        everything.addActionListener(e -> includeEverything());
        input.addActionListener(e -> submit());
        dismiss.addActionListener(e -> {
            send("DISMISSED");
            System.exit(0);
        });
        openSite.addActionListener(e -> {
            try {
                if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                    Desktop.getDesktop().browse(URI.create(SELECTOR_URL));
                }
            } catch (Exception failed) {
                status.setText("Open " + SELECTOR_URL + " in your browser.");
            }
        });
    }
}
