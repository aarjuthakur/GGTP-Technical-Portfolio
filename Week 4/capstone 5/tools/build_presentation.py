"""
Generate the Capstone 5 project overview presentation.

Run:  python tools/build_presentation.py
Out:  docs/Capstone5_Overview.pptx
"""

from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

DEST = Path(__file__).resolve().parent.parent / "docs" / "Capstone5_Overview.pptx"

# Brand colours
TEAL = RGBColor(0x07, 0x50, 0x56)
DARK_TEAL = RGBColor(0x04, 0x33, 0x37)
SKY = RGBColor(0xC5, 0xDC, 0xEE)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_GRAY = RGBColor(0xF5, 0xF5, 0xF5)
DARK_GRAY = RGBColor(0x33, 0x33, 0x33)
GREEN = RGBColor(0x27, 0xAE, 0x60)
RED = RGBColor(0xE7, 0x4C, 0x3C)
ORANGE = RGBColor(0xF3, 0x9C, 0x12)
BLUE = RGBColor(0x29, 0x80, 0xB9)
PURPLE = RGBColor(0x8E, 0x44, 0xAD)
SOFT_GREEN = RGBColor(0xD5, 0xF5, 0xE3)
SOFT_RED = RGBColor(0xFA, 0xDB, 0xD8)
SOFT_BLUE = RGBColor(0xD6, 0xEA, 0xF8)
SOFT_ORANGE = RGBColor(0xFD, 0xEB, 0xD0)
SOFT_PURPLE = RGBColor(0xE8, 0xDA, 0xEF)
SOFT_TEAL = RGBColor(0xD1, 0xF2, 0xEB)


def add_rounded_box(slide, left, top, width, height, fill_color, text="",
                    font_size=11, font_color=DARK_GRAY, bold=False, alignment=PP_ALIGN.LEFT):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    shape.line.fill.background()
    shape.shadow.inherit = False
    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = Pt(10)
    tf.margin_right = Pt(10)
    tf.margin_top = Pt(6)
    tf.margin_bottom = Pt(6)
    if text:
        p = tf.paragraphs[0]
        p.text = text
        p.font.size = Pt(font_size)
        p.font.color.rgb = font_color
        p.font.bold = bold
        p.alignment = alignment
    return shape


def add_text_box(slide, left, top, width, height, text, font_size=11,
                 font_color=DARK_GRAY, bold=False, alignment=PP_ALIGN.LEFT):
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.color.rgb = font_color
    p.font.bold = bold
    p.alignment = alignment
    return txBox


def add_bullet_box(slide, left, top, width, height, title, bullets,
                   fill_color=SOFT_BLUE, title_color=TEAL, bullet_size=10):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    shape.line.fill.background()
    shape.shadow.inherit = False
    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = Pt(10)
    tf.margin_right = Pt(10)
    tf.margin_top = Pt(8)
    tf.margin_bottom = Pt(6)

    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(12)
    p.font.color.rgb = title_color
    p.font.bold = True

    for b in bullets:
        p = tf.add_paragraph()
        p.text = b
        p.font.size = Pt(bullet_size)
        p.font.color.rgb = DARK_GRAY
        p.space_before = Pt(3)
        p.level = 0
    return shape


def add_stat_block(slide, left, top, width, height, number, label,
                   num_color=TEAL, bg_color=SOFT_TEAL):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    shape.line.fill.background()
    shape.shadow.inherit = False
    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = Pt(4)
    tf.margin_right = Pt(4)
    tf.margin_top = Pt(8)

    p = tf.paragraphs[0]
    p.text = str(number)
    p.font.size = Pt(28)
    p.font.color.rgb = num_color
    p.font.bold = True
    p.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = label
    p2.font.size = Pt(9)
    p2.font.color.rgb = DARK_GRAY
    p2.alignment = PP_ALIGN.CENTER
    p2.space_before = Pt(2)
    return shape


def add_flow_arrow(slide, left, top, width, height):
    shape = slide.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = TEAL
    shape.line.fill.background()
    return shape


def add_title_bar(slide, text):
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.33), Inches(1.0))
    bar.fill.solid()
    bar.fill.fore_color.rgb = TEAL
    bar.line.fill.background()
    tf = bar.text_frame
    tf.margin_left = Pt(30)
    tf.margin_top = Pt(16)
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(28)
    p.font.color.rgb = WHITE
    p.font.bold = True


def add_subtitle_text(slide, left, top, width, text, font_size=11):
    add_text_box(slide, left, top, width, Inches(0.35), text, font_size=font_size,
                 font_color=DARK_GRAY, bold=False)


# ── Slide 1: Title ──────────────────────────────────────────────────────

def slide_title(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank

    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.33), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = TEAL
    bg.line.fill.background()

    accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(5.5), Inches(13.33), Inches(0.08))
    accent.fill.solid()
    accent.fill.fore_color.rgb = SKY
    accent.line.fill.background()

    add_text_box(slide, Inches(1), Inches(1.5), Inches(11), Inches(1.2),
                 "CAPSTONE 5", font_size=18, font_color=SKY, bold=True, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, Inches(1), Inches(2.2), Inches(11), Inches(1.5),
                 "Playwright + Microsoft Forms\nSurvey Automation",
                 font_size=36, font_color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, Inches(1), Inches(4.0), Inches(11), Inches(0.6),
                 "Automated & Manual Testing of a 6-Page Customer Satisfaction Survey",
                 font_size=16, font_color=SKY, alignment=PP_ALIGN.CENTER)

    add_text_box(slide, Inches(1), Inches(5.8), Inches(11), Inches(1.0),
                 "Arju Thakur  |  Perficient  |  October 2026",
                 font_size=14, font_color=RGBColor(0xAA, 0xCC, 0xCC), alignment=PP_ALIGN.CENTER)


# ── Slide 2: Objective, Scope & MS Forms Info ────────────────────────────

def slide_objective_scope(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_title_bar(slide, "Objective  |  Scope  |  Microsoft Forms")

    # Objective box
    add_bullet_box(slide, Inches(0.4), Inches(1.2), Inches(4.0), Inches(2.6),
                   "OBJECTIVE", [
                       "Automate testing of a 6-page customer satisfaction survey",
                       "Validate all 15 input types with Playwright",
                       "Test on both a local replica and the published MS Form",
                       "Document all defects with evidence and root cause",
                   ], fill_color=SOFT_TEAL, title_color=TEAL)

    # Scope box
    add_bullet_box(slide, Inches(4.7), Inches(1.2), Inches(4.0), Inches(2.6),
                   "SCOPE", [
                       "44 test cases (38 automated + 6 manual)",
                       "10 testing techniques across 13 modules",
                       "4 browsers + 2 responsive devices",
                       "3 conditional branches with boundary values",
                       "14 data-driven personas + 3 language locales",
                   ], fill_color=SOFT_BLUE, title_color=BLUE)

    # MS Forms Info box
    add_bullet_box(slide, Inches(9.0), Inches(1.2), Inches(4.0), Inches(2.6),
                   "MICROSOFT FORMS", [
                       "Published survey with anonymous responder link",
                       "6 pages, 26 questions, 3 branch points",
                       "Platform constraints: 1 branch per section,",
                       "  1 validation rule per field,",
                       "  file upload needs sign-in",
                   ], fill_color=SOFT_PURPLE, title_color=PURPLE)

    # Techniques row - visual blocks
    add_text_box(slide, Inches(0.4), Inches(4.1), Inches(12), Inches(0.4),
                 "TESTING TECHNIQUES USED", font_size=13, font_color=TEAL, bold=True)

    techniques = [
        ("Functional", SOFT_GREEN), ("Negative", SOFT_RED), ("Boundary Value", SOFT_BLUE),
        ("Conditional", SOFT_ORANGE), ("E2E", SOFT_TEAL), ("Regression", SOFT_PURPLE),
        ("Cross-Browser", SOFT_GREEN), ("Responsive", SOFT_BLUE), ("Data-Driven", SOFT_ORANGE),
        ("Manual/Usability", SOFT_RED),
    ]
    x = Inches(0.4)
    for name, color in techniques:
        add_rounded_box(slide, x, Inches(4.55), Inches(1.2), Inches(0.4), color,
                        text=name, font_size=9, font_color=DARK_GRAY, bold=True, alignment=PP_ALIGN.CENTER)
        x += Inches(1.28)

    # 15 Input Types row
    add_text_box(slide, Inches(0.4), Inches(5.2), Inches(12), Inches(0.4),
                 "15 INPUT TYPES COVERED", font_size=13, font_color=TEAL, bold=True)

    inputs = [
        "Text", "Paragraph", "Multiple Choice", "Checkboxes", "Dropdown",
        "Rating (1-5)", "Likert", "NPS (0-10)", "Date", "Time",
        "Email", "Number", "Ranking", "File Upload", "Branching",
    ]
    x = Inches(0.4)
    for name in inputs:
        w = Inches(0.8) if len(name) <= 8 else Inches(0.95)
        add_rounded_box(slide, x, Inches(5.65), w, Inches(0.35), SKY,
                        text=name, font_size=8, font_color=DARK_TEAL, bold=True, alignment=PP_ALIGN.CENTER)
        x += w + Inches(0.05)

    # Modules row
    add_text_box(slide, Inches(0.4), Inches(6.25), Inches(12), Inches(0.4),
                 "13 TEST MODULES", font_size=13, font_color=TEAL, bold=True)

    modules = [
        ("Smoke", "2"), ("Functional", "8"), ("Conditional", "11"), ("Validation", "4"),
        ("E2E", "2"), ("Cross-Browser", "3"), ("Responsive", "2"), ("Regression", "2"),
        ("Integration", "2"), ("Data-Driven", "1"), ("Multilingual", "1"),
        ("Manual", "6"),
    ]
    x = Inches(0.4)
    for name, count in modules:
        add_rounded_box(slide, x, Inches(6.65), Inches(1.03), Inches(0.45), LIGHT_GRAY,
                        text=f"{name}\n({count} TCs)", font_size=8, font_color=DARK_GRAY,
                        bold=True, alignment=PP_ALIGN.CENTER)
        x += Inches(1.08)


# ── Slide 3: Test Architecture Workflow ──────────────────────────────────

def slide_architecture(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_title_bar(slide, "Test Architecture  |  How It All Connects")

    # Row 1: Source layer
    add_text_box(slide, Inches(0.4), Inches(1.2), Inches(3), Inches(0.3),
                 "TEST DATA LAYER", font_size=12, font_color=TEAL, bold=True)
    add_bullet_box(slide, Inches(0.4), Inches(1.55), Inches(3.8), Inches(1.8),
                   "Fixtures & Data", [
                       "surveyData.ts - valid users, boundaries",
                       "liveSurveyData.ts - live form answers",
                       "personas.json - 14 data-driven rows",
                       "capstoneFixtures.ts - custom Playwright fixtures",
                   ], fill_color=SOFT_BLUE, title_color=BLUE, bullet_size=9)

    add_flow_arrow(slide, Inches(4.4), Inches(2.2), Inches(0.5), Inches(0.35))

    # POM layer
    add_text_box(slide, Inches(5.1), Inches(1.2), Inches(3), Inches(0.3),
                 "PAGE OBJECT LAYER", font_size=12, font_color=TEAL, bold=True)

    add_bullet_box(slide, Inches(5.1), Inches(1.55), Inches(3.5), Inches(0.8),
                   "SurveyPage.ts (Replica)", [
                       "6 sub-pages | data-testid locators",
                   ], fill_color=SOFT_GREEN, title_color=GREEN, bullet_size=9)

    add_bullet_box(slide, Inches(5.1), Inches(2.5), Inches(3.5), Inches(0.85),
                   "MicrosoftFormsPage.ts (Live)", [
                       "data-automation-id locators | portal handling",
                   ], fill_color=SOFT_ORANGE, title_color=ORANGE, bullet_size=9)

    add_flow_arrow(slide, Inches(8.8), Inches(2.2), Inches(0.5), Inches(0.35))

    # Test layer
    add_text_box(slide, Inches(9.5), Inches(1.2), Inches(3.5), Inches(0.3),
                 "TEST SPEC LAYER", font_size=12, font_color=TEAL, bold=True)
    add_bullet_box(slide, Inches(9.5), Inches(1.55), Inches(3.5), Inches(1.8),
                   "44 Test Cases", [
                       "1 file per test case (TC-001 to TC-044)",
                       "Grouped by module in tests/ folder",
                       "expect() assertions with messages",
                       "test.fail() for known platform defects",
                   ], fill_color=SOFT_TEAL, title_color=TEAL, bullet_size=9)

    # Row 2: Dual-target architecture
    add_text_box(slide, Inches(0.4), Inches(3.7), Inches(12), Inches(0.3),
                 "DUAL-TARGET ARCHITECTURE", font_size=13, font_color=TEAL, bold=True)

    # Replica box
    add_bullet_box(slide, Inches(0.4), Inches(4.1), Inches(5.8), Inches(2.0),
                   "LOCAL REPLICA  (app/index.html + survey.js)", [
                       "Runs on localhost:4173 (auto-started by Playwright)",
                       "All 15 input types implemented with full validation",
                       "Both min AND max character limits enforced",
                       "All 3 conditional branches work correctly",
                       "File upload works without sign-in",
                       "Cross-browser: Chromium, Firefox, WebKit, Edge",
                       "Responsive: iPhone 13 + iPad 7th gen viewports",
                   ], fill_color=SOFT_GREEN, title_color=GREEN, bullet_size=9)

    # Arrow between
    add_text_box(slide, Inches(6.3), Inches(4.8), Inches(0.8), Inches(0.5),
                 "FORM_MODE\nenv var", font_size=8, font_color=TEAL, bold=True, alignment=PP_ALIGN.CENTER)

    # Live box
    add_bullet_box(slide, Inches(7.1), Inches(4.1), Inches(5.8), Inches(2.0),
                   "PUBLISHED MS FORM  (anonymous link)", [
                       "Real Microsoft Forms survey in the cloud",
                       "21 automated specs + 3 manual procedures",
                       "MicrosoftFormsPage POM with MS-native locators",
                       "6 expected failures documenting platform defects",
                       "Data-driven: 14 personas through Page 1",
                       "Multi-lingual: German, Japanese, Arabic",
                       "Integration: submit + backend acceptance",
                   ], fill_color=SOFT_ORANGE, title_color=ORANGE, bullet_size=9)

    # Config row
    add_text_box(slide, Inches(0.4), Inches(6.4), Inches(12), Inches(0.3),
                 "KEY CONFIG FILES", font_size=12, font_color=TEAL, bold=True)

    configs = [
        ("playwright.config.ts", "10 projects, webServer, browsers"),
        ("config/env.ts", "FORM_MODE toggle (local/remote)"),
        ("config/liveForm.ts", "Live form URL, questions, branches, validation rules"),
    ]
    x = Inches(0.4)
    for name, desc in configs:
        add_rounded_box(slide, x, Inches(6.75), Inches(4.1), Inches(0.5), LIGHT_GRAY,
                        text=f"{name}\n{desc}", font_size=9, font_color=DARK_GRAY, bold=False,
                        alignment=PP_ALIGN.CENTER)
        x += Inches(4.2)


# ── Slide 4: Replica Deep Dive ───────────────────────────────────────────

def slide_replica(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_title_bar(slide, "Local Replica  |  Why We Built It & What It Tests")

    # WHY section
    add_text_box(slide, Inches(0.4), Inches(1.2), Inches(6), Inches(0.35),
                 "WHY A REPLICA?  (MS Forms platform gaps)", font_size=14, font_color=TEAL, bold=True)

    gaps = [
        ("1 branch\nper section", "Can't route on rating\nAND NPS AND satisfaction", SOFT_RED),
        ("1 rule\nper field", "Can't set both min\nAND max char limits", SOFT_RED),
        ("File upload\nneeds sign-in", "Anonymous users can't\nsee the upload question", SOFT_RED),
        ("No native\ntime/Likert/email", "MS Forms uses text boxes\nas workarounds", SOFT_RED),
        ("Cloud\ndependency", "Tests need internet\nand MS servers up", SOFT_ORANGE),
    ]
    x = Inches(0.4)
    for title, desc, color in gaps:
        box = add_rounded_box(slide, x, Inches(1.65), Inches(2.35), Inches(1.2), color,
                              font_size=9, alignment=PP_ALIGN.CENTER)
        tf = box.text_frame
        tf.paragraphs[0].text = title
        tf.paragraphs[0].font.size = Pt(11)
        tf.paragraphs[0].font.bold = True
        tf.paragraphs[0].font.color.rgb = DARK_GRAY
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(8)
        p2.font.color.rgb = DARK_GRAY
        p2.alignment = PP_ALIGN.CENTER
        p2.space_before = Pt(6)
        x += Inches(2.45)

    # WHAT IT TESTS section
    add_text_box(slide, Inches(0.4), Inches(3.1), Inches(12), Inches(0.35),
                 "WHAT THE REPLICA COVERS", font_size=14, font_color=TEAL, bold=True)

    covers = [
        ("15 Input Types", "Text, paragraph, choice,\ncheckbox, dropdown, rating,\nLikert, NPS, date, time,\nemail, number, ranking,\nfile upload, branching", SOFT_GREEN),
        ("Full Validation", "Min AND max char limits\nEmail format check\nNumber-only enforcement\nRequired field blocking", SOFT_BLUE),
        ("3 Branches", "Rating -> positive/improve\nNPS -> promoter/passive/\ndetractor\nFollow-up -> Yes/No", SOFT_TEAL),
        ("4 Browsers", "Chromium\nFirefox\nWebKit (Safari)\nMicrosoft Edge", SOFT_PURPLE),
        ("2 Devices", "iPhone 13 (390x844)\niPad 7th gen (810x1080)\nNo overflow on any page", SOFT_ORANGE),
    ]
    x = Inches(0.4)
    for title, desc, color in covers:
        box = add_rounded_box(slide, x, Inches(3.55), Inches(2.35), Inches(1.8), color,
                              font_size=9, alignment=PP_ALIGN.CENTER)
        tf = box.text_frame
        tf.paragraphs[0].text = title
        tf.paragraphs[0].font.size = Pt(12)
        tf.paragraphs[0].font.bold = True
        tf.paragraphs[0].font.color.rgb = DARK_TEAL
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(9)
        p2.font.color.rgb = DARK_GRAY
        p2.alignment = PP_ALIGN.CENTER
        p2.space_before = Pt(6)
        x += Inches(2.45)

    # HOW IT WORKS row
    add_text_box(slide, Inches(0.4), Inches(5.6), Inches(12), Inches(0.35),
                 "HOW IT WORKS", font_size=14, font_color=TEAL, bold=True)

    steps = [
        ("app/\nindex.html + survey.js", "6-page HTML/JS survey\nwith client-side logic"),
        ("http-server\nlocalhost:4173", "Playwright auto-starts\na local web server"),
        ("SurveyPage.ts\nPOM", "6 sub-page objects\nwith data-testid locators"),
        ("tests/\n*.spec.ts", "One file per test case\nusing expect() assertions"),
        ("localStorage\npersistence", "Answers saved and\nverified after reload"),
    ]
    x = Inches(0.4)
    for i, (title, desc) in enumerate(steps):
        box = add_rounded_box(slide, x, Inches(6.0), Inches(2.15), Inches(1.1), LIGHT_GRAY,
                              font_size=9, alignment=PP_ALIGN.CENTER)
        tf = box.text_frame
        tf.paragraphs[0].text = title
        tf.paragraphs[0].font.size = Pt(10)
        tf.paragraphs[0].font.bold = True
        tf.paragraphs[0].font.color.rgb = TEAL
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(8)
        p2.font.color.rgb = DARK_GRAY
        p2.alignment = PP_ALIGN.CENTER
        p2.space_before = Pt(4)
        if i < len(steps) - 1:
            add_flow_arrow(slide, x + Inches(2.2), Inches(6.35), Inches(0.35), Inches(0.25))
        x += Inches(2.45)


# ── Slide 5: Final Execution Summary ─────────────────────────────────────

def slide_execution_summary(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_title_bar(slide, "Final Execution Summary  |  Run 16 Results")

    # Top stat blocks
    stats = [
        ("44", "Test Cases", TEAL, SOFT_TEAL),
        ("181", "Automated\nRuns", GREEN, SOFT_GREEN),
        ("100%", "Pass Rate", GREEN, SOFT_GREEN),
        ("0", "Failures", GREEN, SOFT_GREEN),
        ("6", "Expected\nFails (Live)", ORANGE, SOFT_ORANGE),
        ("15", "Defects\nFound", RED, SOFT_RED),
        ("4", "Defects\nFixed", GREEN, SOFT_GREEN),
        ("2.8 min", "Execution\nTime", BLUE, SOFT_BLUE),
    ]
    x = Inches(0.3)
    for num, label, nc, bg in stats:
        add_stat_block(slide, x, Inches(1.2), Inches(1.5), Inches(1.1), num, label, nc, bg)
        x += Inches(1.6)

    # Browser breakdown
    add_text_box(slide, Inches(0.4), Inches(2.6), Inches(6), Inches(0.3),
                 "RUNS BY PROJECT", font_size=12, font_color=TEAL, bold=True)

    projects = [
        ("Chromium", "36", SOFT_GREEN),
        ("Firefox", "33", SOFT_BLUE),
        ("WebKit", "33", SOFT_PURPLE),
        ("Edge", "33", SOFT_ORANGE),
        ("Cross-Browser", "3", SOFT_TEAL),
        ("Mobile + Tablet", "2", SOFT_RED),
        ("Live + Data + i18n", "41", SOFT_ORANGE),
    ]
    x = Inches(0.4)
    for name, count, color in projects:
        box = add_rounded_box(slide, x, Inches(2.95), Inches(1.7), Inches(0.7), color,
                              font_size=9, alignment=PP_ALIGN.CENTER)
        tf = box.text_frame
        tf.paragraphs[0].text = count
        tf.paragraphs[0].font.size = Pt(20)
        tf.paragraphs[0].font.bold = True
        tf.paragraphs[0].font.color.rgb = DARK_TEAL
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER
        p2 = tf.add_paragraph()
        p2.text = name
        p2.font.size = Pt(9)
        p2.font.color.rgb = DARK_GRAY
        p2.alignment = PP_ALIGN.CENTER
        x += Inches(1.8)

    # Method split
    add_text_box(slide, Inches(0.4), Inches(3.9), Inches(6), Inches(0.3),
                 "AUTOMATED vs MANUAL", font_size=12, font_color=TEAL, bold=True)

    add_rounded_box(slide, Inches(0.4), Inches(4.25), Inches(8.5), Inches(0.5), SOFT_GREEN,
                    text="38 Automated Test Cases (86%)", font_size=12, font_color=GREEN,
                    bold=True, alignment=PP_ALIGN.CENTER)
    add_rounded_box(slide, Inches(9.1), Inches(4.25), Inches(3.8), Inches(0.5), SOFT_ORANGE,
                    text="6 Manual (14%)", font_size=12, font_color=ORANGE,
                    bold=True, alignment=PP_ALIGN.CENTER)

    # Coverage checklist
    add_text_box(slide, Inches(0.4), Inches(5.0), Inches(6), Inches(0.3),
                 "COVERAGE CHECKLIST", font_size=12, font_color=TEAL, bold=True)

    checks = [
        "All 15 input types exercised",
        "All 3 conditional branches tested",
        "4 browsers + 2 devices covered",
        "14 data-driven personas validated",
        "3 language locales tested",
        "All 44 test cases passing",
    ]
    x = Inches(0.4)
    for i, check in enumerate(checks):
        col = i % 3
        row = i // 3
        lx = Inches(0.4) + col * Inches(4.2)
        ly = Inches(5.35) + row * Inches(0.45)
        add_rounded_box(slide, lx, ly, Inches(4.0), Inches(0.38), SOFT_GREEN,
                        text=f"  {check}", font_size=10, font_color=GREEN, bold=False)

    # Gate decision
    add_rounded_box(slide, Inches(0.4), Inches(6.4), Inches(12.5), Inches(0.6), GREEN,
                    text="GATE DECISION:  GO  -  All 6 entry criteria met  |  100% pass rate  |  Project ready for submission",
                    font_size=14, font_color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)


# ── Slide 6: Defect Summary ──────────────────────────────────────────────

def slide_defects(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_title_bar(slide, "Defect Summary  |  15 Found, 4 Fixed, 11 Platform Issues")

    # Top stats
    defect_stats = [
        ("0", "Critical", GREEN, SOFT_GREEN),
        ("8", "Major Open\n(MS Forms)", RED, SOFT_RED),
        ("3", "Minor Open\n(MS Forms)", ORANGE, SOFT_ORANGE),
        ("2", "Major Fixed\n(Replica)", GREEN, SOFT_GREEN),
        ("2", "Minor Fixed\n(Replica)", GREEN, SOFT_GREEN),
    ]
    x = Inches(0.4)
    for num, label, nc, bg in defect_stats:
        add_stat_block(slide, x, Inches(1.2), Inches(2.35), Inches(1.0), num, label, nc, bg)
        x += Inches(2.5)

    # Fixed defects
    add_text_box(slide, Inches(0.4), Inches(2.5), Inches(6), Inches(0.3),
                 "FIXED (Replica Code Bugs)", font_size=12, font_color=GREEN, bold=True)

    fixed = [
        ("DEF-001", "Dropdown locator used label instead of ID"),
        ("DEF-002", "Error stayed after NPS selection"),
        ("DEF-003", "Progress bar invisible (CSS display)"),
        ("DEF-015", "Rejected file vanished with no error"),
    ]
    y = Inches(2.85)
    for defid, desc in fixed:
        add_rounded_box(slide, Inches(0.4), y, Inches(1.2), Inches(0.35), GREEN,
                        text=defid, font_size=9, font_color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)
        add_rounded_box(slide, Inches(1.7), y, Inches(5.0), Inches(0.35), SOFT_GREEN,
                        text=desc, font_size=9, font_color=DARK_GRAY)
        y += Inches(0.4)

    # Platform defects - branching
    add_text_box(slide, Inches(0.4), Inches(4.55), Inches(8), Inches(0.3),
                 "OPEN - MS Forms Branching Issues (1 branch per section)", font_size=12, font_color=RED, bold=True)

    branching = [
        ("DEF-004", "Dissatisfied users skip the improvement page"),
        ("DEF-005", "Promoters see complaint questions, not case study"),
        ("DEF-006", "Passive users see all 3 conditional blocks mixed"),
        ("DEF-007", "Changing answer leaves old questions on screen"),
        ("DEF-008", "NPS score has no effect on page routing"),
        ("DEF-009", "Star rating has no effect on page routing"),
        ("DEF-010", "Date field is a text box instead of date picker"),
        ("DEF-011", "Satisfied users see 'Why not satisfied?' page"),
    ]
    y = Inches(4.9)
    for defid, desc in branching:
        add_rounded_box(slide, Inches(0.4), y, Inches(1.2), Inches(0.3), RED,
                        text=defid, font_size=8, font_color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)
        add_rounded_box(slide, Inches(1.7), y, Inches(5.5), Inches(0.3), SOFT_RED,
                        text=desc, font_size=8, font_color=DARK_GRAY)
        y += Inches(0.33)

    # Platform defects - validation
    add_text_box(slide, Inches(7.5), Inches(4.55), Inches(5.5), Inches(0.3),
                 "OPEN - MS Forms Validation Limits", font_size=12, font_color=ORANGE, bold=True)

    validation = [
        ("DEF-012", "Name > 100 chars accepted\n(can't set max when min is used)"),
        ("DEF-013", "Employee count 0 accepted\n(no minimum value option)"),
        ("DEF-014", "Decimal 25.5 accepted\n(no integers-only option)"),
    ]
    y = Inches(4.9)
    for defid, desc in validation:
        add_rounded_box(slide, Inches(7.5), y, Inches(1.2), Inches(0.55), ORANGE,
                        text=defid, font_size=9, font_color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)
        add_rounded_box(slide, Inches(8.8), y, Inches(4.0), Inches(0.55), SOFT_ORANGE,
                        text=desc, font_size=9, font_color=DARK_GRAY)
        y += Inches(0.6)

    # Root cause box
    add_rounded_box(slide, Inches(7.5), Inches(6.7), Inches(5.3), Inches(0.55), LIGHT_GRAY,
                    text="Root Cause: MS Forms allows only 1 branching rule per\nsection and 1 validation rule per text field",
                    font_size=9, font_color=DARK_GRAY, bold=True, alignment=PP_ALIGN.CENTER)


# ── Main ─────────────────────────────────────────────────────────────────

def main():
    prs = Presentation()
    prs.slide_width = Inches(13.33)
    prs.slide_height = Inches(7.5)

    slide_title(prs)
    slide_objective_scope(prs)
    slide_architecture(prs)
    slide_replica(prs)
    slide_execution_summary(prs)
    slide_defects(prs)

    DEST.parent.mkdir(parents=True, exist_ok=True)
    prs.save(str(DEST))
    print(f"Saved: {DEST}")


if __name__ == "__main__":
    main()
