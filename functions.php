<?php
/**
 * Theme functions and definitions
 */

add_filter('upload_mimes', 'ca_mime_types');

if ( ! function_exists( 'ca_mime_types' ) ):
	function ca_mime_types($mimes) {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
endif;

add_action( 'after_setup_theme', 'twg_setup' );

if ( ! function_exists( 'twg_setup' ) ):

function twg_setup() {
	// This theme uses wp_nav_menu() in one location.
	register_nav_menu( 'primary', __( 'Primary Menu', 'twg' ) );
	// This theme uses Featured Images (also known as post thumbnails) for per-post/per-page Custom Header images
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );
}
endif; // twg_setup

add_action( 'wp_enqueue_scripts', 'paygo_scripts_n_styles' );

if ( ! function_exists( 'paygo_scripts_n_styles' ) ):
	function paygo_scripts_n_styles() {
		//wp_enqueue_script( string $handle, string $src = '', array $deps = array(), string|bool|null $ver = false, bool $in_footer = false )
	    wp_enqueue_script( 'twg_main', get_stylesheet_directory_uri().'/js/script.js', array('jquery'), '1.0' );
	    //wp_enqueue_style( string $handle, string $src = '', array $deps = array(), string|bool|null $ver = false, string $media = 'all' )
	    wp_enqueue_style( 'twg_main', get_stylesheet_directory_uri().'/style.css', array(), '1.0' );
	}
endif;

require_once('includes/customizer/generator.php');
//menus
register_nav_menus(
	array(
		'header-top-menu' => 'Header Top Menu Location',
		'mobile-menu'  => 'Mobile Menu Location',
	)
);

//load javascript
function load_js(){
	wp_enqueue_script('jquery');
	wp_register_script('custom-javascript', get_template_directory_uri().'/includes/js/menu.js', 'jquery', false, true);
	wp_enqueue_script('custom-javascript');
}
add_action('wp_enqueue_scripts','load_js');

//custom logo
add_theme_support( 'custom-logo', array(
	'height'      => 100,
	'width'       => 400,
	'flex-height' => true,
	'flex-width'  => true,
	'header-text' => array( 'site-title', 'site-description' ),
) );


//header
add_action('wp_head', 'main_header');
function main_header(){
?>
<header class="header-container center-element">
	<section class="container-width-extra four-column-grid menu-font">
		<!-- first logo coulmn -->
		<div>
			<?php 
			   $custom_logo_id = get_theme_mod( 'custom_logo' );
			   $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
			?>
			<img src="<?php echo $image[0]; ?>" alt="">
		</div>
		
		<!-- second top menu header coulmn -->
		<div class="header-top-menu-container">
			<?php
				wp_nav_menu(
					array(
						'theme_location' => 'header-top-menu',
						'menu_class' => 'header-top-menu'
					)
				);
             ?>
		</div>
		
		<!-- third button coulmn -->
		<div class="register-button">
			<a href="" class="button-style">Sign In/Register</a>
		</div>
		
		<!-- fourth hamburger coulmn -->
		<div class="hamburger-container">
<!-- 				<div></div>
				<div></div>
				<div></div> -->
			<img class="hamburger" src="http://dacxi.thedevguys.co.nz/wp-content/uploads/2022/01/hamburger.png">
			
			<img class="close-button hide-element" src="http://dacxi.thedevguys.co.nz/wp-content/uploads/2022/01/close.png">
			
		</div>
		<div class="mobile-menu-container">
			<img class="letter-one" src="http://dacxi.thedevguys.co.nz/wp-content/uploads/2022/01/01.png">
			<div class="mobile-menu hide-element">
				
					<?php
						wp_nav_menu(
							array(
								'theme_location'  => 'mobile-menu',
								'menu_class'      => 'primary-menu',
							)
						);
					?>
			</div>
			<div class="secondary-menu-container hide-element center-element">
				<img class="letter-two" src="http://dacxi.thedevguys.co.nz/wp-content/uploads/2022/01/02.png">
				<section class="secondary-menu-links center-element">
					<div class="secondary-links">
						
					</div>
				</section>
			</div>
		</div>
		
	</section>
</header>

<?php
};